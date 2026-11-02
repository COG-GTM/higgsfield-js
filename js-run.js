const { createHiggsfieldClient } = require('/home/ubuntu/repos/higgsfield-js/dist/v2');
const log = (...a) => console.log(new Date().toISOString(), ...a);
const client = createHiggsfieldClient({ credentials: process.env.HF_KEY, maxPollTime: 45 * 60 * 1000, pollInterval: 10000 });
log('submitting via @higgsfield/client v2 subscribe');
client.subscribe('higgsfield/genjutsu/restyle/v1.0', { input: {
  video_url: 'https://d3snorpfx4xhv8.cloudfront.net/a4086dbb-d386-4bab-8efd-636d1f91e38e/59dac11e-bd99-4bc7-a627-2638e7ad9840.mp4',
  preset_id: 'c2143317-f28d-4c3c-a0b8-39bd547e08a7', image_urls: [],
  prompt: 'Preserve the original movement and camera composition.', resolution: '480p' } })
  .then(r => log('result', JSON.stringify(r)))
  .catch(e => { log('error', e && e.message, JSON.stringify(e && (e.response || e.detail || ''))); process.exit(1); });
