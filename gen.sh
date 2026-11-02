#!/usr/bin/env bash
set -u; cd ~; CLIP=https://d3snorpfx4xhv8.cloudfront.net/a4086dbb-d386-4bab-8efd-636d1f91e38e/59dac11e-bd99-4bc7-a627-2638e7ad9840.mp4
BODY='{"video_url":"'$CLIP'","preset_id":"c2143317-f28d-4c3c-a0b8-39bd547e08a7","image_urls":[],"prompt":"Preserve the original movement and camera composition.","resolution":"480p"}'
R=$(curl -sS -X POST https://api.higgsfield.ai/higgsfield/genjutsu/restyle/v1.0 -H "Authorization: Key $HF_KEY" -H "Content-Type: application/json" -d "$BODY")
echo "$(date -u +%FT%TZ) submit $R" >> run.log
ID=$(echo "$R" | python3 -c 'import json,sys;print(json.load(sys.stdin)["request_id"])') || exit 1
while true; do
  S=$(curl -sS https://api.higgsfield.ai/requests/$ID/status -H "Authorization: Key $HF_KEY")
  ST=$(echo "$S" | python3 -c 'import json,sys;print(json.load(sys.stdin).get("status"))' 2>/dev/null || echo err)
  echo "$(date -u +%FT%TZ) $ST" >> run.log
  case $ST in completed) U=$(echo "$S" | python3 -c 'import json,sys;print(json.load(sys.stdin)["video"]["url"])'); echo "$(date -u +%FT%TZ) output $U" >> run.log; curl -sS -o output.mp4 "$U"; break;; failed|nsfw|canceled) echo "$S" >> run.log; break;; esac
  sleep 10
done
