import {
  GenjutsuEndpoint,
  GenjutsuResolution,
  GenjutsuRestylePreset,
  GenjutsuRestylePresetName,
} from './helpers';

describe('Genjutsu helpers', () => {
  it('exposes the three Genjutsu endpoint ids', () => {
    expect(GenjutsuEndpoint).toEqual({
      RESTYLE: 'higgsfield/genjutsu/restyle/v1.0',
      MOTION_TRANSFER: 'higgsfield/genjutsu/motion-transfer/v1.0',
      OBJECT_SWAP: 'higgsfield/genjutsu/object-swap/v1.0',
    });
    expect(Object.values(GenjutsuResolution)).toEqual(['480p', '720p', '1080p']);
  });

  it('has a display name for every restyle preset id', () => {
    const ids = Object.values(GenjutsuRestylePreset);
    expect(ids).toHaveLength(20);
    expect(new Set(ids).size).toBe(ids.length);
    expect(Object.keys(GenjutsuRestylePresetName).sort()).toEqual([...ids].sort());
    expect(GenjutsuRestylePresetName[GenjutsuRestylePreset.CEL_SHADED_CG_ANIME]).toBe(
      'Cel-Shaded CG Anime'
    );
  });
});
