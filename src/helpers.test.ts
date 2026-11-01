import { GenjutsuResolution, GenjutsuRestylePreset } from './helpers';
import type { EndpointInput, GenjutsuRestyleInput } from './v2/types';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

describe('Genjutsu helpers', () => {
  it('exposes the resolution tiers accepted by the Genjutsu endpoints', () => {
    expect(Object.values(GenjutsuResolution).sort()).toEqual(['1080p', '480p', '720p']);
    expect(GenjutsuResolution.HD).toBe('720p');
  });

  it('maps every restyle preset name to a unique UUID', () => {
    const ids = Object.values(GenjutsuRestylePreset);
    expect(ids.length).toBe(20);
    expect(new Set(ids).size).toBe(ids.length);
    ids.forEach((id) => expect(id).toMatch(UUID_RE));
    expect(GenjutsuRestylePreset.CEL_SHADED_CG_ANIME).toBe(
      'c2143317-f28d-4c3c-a0b8-39bd547e08a7'
    );
  });

  it('type-checks a documented restyle request against the endpoint input map', () => {
    const input: EndpointInput<'higgsfield/genjutsu/restyle/v1.0'> = {
      video_url: 'https://example.com/input.mp4',
      preset_id: GenjutsuRestylePreset.CEL_SHADED_CG_ANIME,
      image_urls: [],
      prompt: 'Preserve the original movement and camera composition.',
      resolution: GenjutsuResolution.HD,
    };
    const restyle: GenjutsuRestyleInput = input;
    expect(restyle.preset_id).toBe(GenjutsuRestylePreset.CEL_SHADED_CG_ANIME);
  });
});
