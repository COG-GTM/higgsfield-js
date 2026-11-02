import { config, higgsfield, GenjutsuEndpoint, GenjutsuResolution } from '@higgsfield/client/v2';

config({
  credentials: process.env.HF_CREDENTIALS,
  maxPollTime: 15 * 60 * 1000 // Genjutsu jobs take ~5-7 minutes
});

// GET /models/higgsfield/genjutsu/restyle/v1.0/presets -> [{ id, name, preview_url }]
const presets = await higgsfield.getGenjutsuRestylePresets();
const preset = presets.find((p) => p.name === 'Cel-Shaded CG Anime');
console.log(`${presets.length} presets, using "${preset.name}" (${preset.id})`);

const result = await higgsfield.subscribe(GenjutsuEndpoint.RESTYLE, {
  input: {
    video_url: 'https://d3snorpfx4xhv8.cloudfront.net/a4086dbb-d386-4bab-8efd-636d1f91e38e/59dac11e-bd99-4bc7-a627-2638e7ad9840.mp4',
    preset_id: preset.id,
    image_urls: [], // optional character references (0-5); omit or pass [], never null
    prompt: 'Preserve the original movement and camera composition.',
    resolution: GenjutsuResolution.SD // '480p' | '720p' (default) | '1080p'
  },
  withPolling: true
});

console.log(result.status, result.request_id, result.video?.url);
