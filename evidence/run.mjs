// Live check for COG-GTM/higgsfield-js PR #1: Genjutsu Restyle via higgsfield.subscribe (v2) with the new typed helpers.
const t0 = Date.now();
const el = () => ((Date.now() - t0) / 1000).toFixed(1).padStart(6) + 's';
const { higgsfield, config, GenjutsuResolution, GenjutsuRestylePreset } = await import('./js/dist/v2/index.js');
config({ credentials: `${process.env.HF_API_KEY_ID}:${process.env.HF_API_KEY_SECRET}`, maxPollTime: 900000 }); // Genjutsu jobs run ~6 min; default 5-min poll timeout is too short
console.log(`[${el()}] presets in helper:`, Object.keys(GenjutsuRestylePreset).length, '| resolutions:', Object.values(GenjutsuResolution).join(','));
const res = await higgsfield.subscribe('higgsfield/genjutsu/restyle/v1.0', {
  input: {
    video_url: 'https://d3snorpfx4xhv8.cloudfront.net/a4086dbb-d386-4bab-8efd-636d1f91e38e/048d2e32-a6e8-4ec6-8013-042e8b25397e.mp4',
    preset_id: GenjutsuRestylePreset.FELT_PUPPET_STOP_MOTION,
    image_urls: [],
    prompt: 'Preserve the original movement and camera composition.',
    resolution: GenjutsuResolution.SD ?? '480p',
  },
  withPolling: true,
  onQueueUpdate: (s) => console.log(`[${el()}] status:`, JSON.stringify(s)),
});
console.log(`[${el()}] DONE`);
console.log(JSON.stringify(res, null, 2));
