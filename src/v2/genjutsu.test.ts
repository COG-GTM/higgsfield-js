import axios, { AxiosHeaders, InternalAxiosRequestConfig } from 'axios';

import { createHiggsfieldClient, reset } from './client';
import { EndpointInput } from './types';
import { GENJUTSU_RESTYLE_PRESETS_PATH, GenjutsuEndpoint, GenjutsuResolution } from '../helpers';

function mockNetwork(data: unknown) {
  const requests: InternalAxiosRequestConfig[] = [];
  const realCreate = axios.create.bind(axios);
  jest.spyOn(axios, 'create').mockImplementation((options) => {
    const client = realCreate(options);
    client.defaults.adapter = async (request) => {
      requests.push(request);
      return { data, status: 200, statusText: 'OK', headers: new AxiosHeaders(), config: request };
    };
    return client;
  });
  return requests;
}

beforeEach(() => reset());
afterEach(() => {
  jest.restoreAllMocks();
  reset();
});

test('Genjutsu endpoint ids and resolutions match the API', () => {
  expect(GenjutsuEndpoint).toEqual({
    MOTION_TRANSFER: 'higgsfield/genjutsu/motion-transfer/v1.0',
    OBJECT_SWAP: 'higgsfield/genjutsu/object-swap/v1.0',
    RESTYLE: 'higgsfield/genjutsu/restyle/v1.0',
  });
  expect(Object.values(GenjutsuResolution)).toEqual(['480p', '720p', '1080p']);
});

test('getGenjutsuRestylePresets GETs the presets endpoint with Key auth and returns items', async () => {
  const items = [
    { id: 'c2143317-f28d-4c3c-a0b8-39bd547e08a7', name: 'Cel-Shaded CG Anime', preview_url: 'https://x/p.mp4' },
  ];
  const requests = mockNetwork({ model: GenjutsuEndpoint.RESTYLE, items });
  const client = createHiggsfieldClient({ credentials: 'id:secret' });

  await expect(client.getGenjutsuRestylePresets()).resolves.toEqual(items);
  expect(requests).toHaveLength(1);
  expect(requests[0].method).toBe('get');
  expect(requests[0].baseURL).toBe('https://api.higgsfield.ai');
  expect(requests[0].url).toBe(GENJUTSU_RESTYLE_PRESETS_PATH);
  expect(requests[0].headers.Authorization).toBe('Key id:secret');
});

test('subscribe posts a typed Restyle input as the request body', async () => {
  const requests = mockNetwork({ status: 'queued', request_id: 'r1' });
  const client = createHiggsfieldClient({ credentials: 'id:secret' });
  const input: EndpointInput<typeof GenjutsuEndpoint.RESTYLE> = {
    video_url: 'https://example.com/source.mp4',
    preset_id: 'c2143317-f28d-4c3c-a0b8-39bd547e08a7',
    image_urls: [],
    prompt: 'Preserve the original movement and camera composition.',
    resolution: GenjutsuResolution.SD,
  };

  await client.subscribe(GenjutsuEndpoint.RESTYLE, { input, withPolling: false });
  expect(requests[0].url).toBe('/higgsfield/genjutsu/restyle/v1.0');
  expect(JSON.parse(requests[0].data)).toEqual(input);
});
