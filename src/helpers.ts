import { BadInputError } from './errors';

/**
 * Helper class for creating image input references
 */
export class InputImage {
    /**
     * Creates an image reference from a URL
     * @param url - The URL of the image
     * @returns An object with image_url type and the provided URL
     * @throws BadInputError if URL is empty or invalid
     * @example
     * const imageRef = InputImage.fromUrl('https://example.com/image.jpg');
     */
    static fromUrl(url: string) {
        if (!url || typeof url !== 'string' || url.trim() === '') {
            throw new BadInputError('Image URL must be a non-empty string');
        }
        return {
            type: 'image_url',
            image_url: url
        }
    }
}

/**
 * Helper class for creating audio input references
 */
export class InputAudio {
    /**
     * Creates an audio reference from a URL
     * @param url - The URL of the audio file (must be WAV format)
     * @returns An object with audio_url type and the provided URL
     * @throws BadInputError if URL is empty or invalid
     * @example
     * const audioRef = InputAudio.fromUrl('https://example.com/audio.wav');
     */
    static fromUrl(url: string) {
        if (!url || typeof url !== 'string' || url.trim() === '') {
            throw new BadInputError('Audio URL must be a non-empty string');
        }
        return {
            type: 'audio_url',
            audio_url: url
        }
    }
}

/**
 * Creates a motion input object for video generation
 * @param motionId - The UUID of the motion from getMotions()
 * @param inputStrength - The strength of the motion effect (0.0 to 1.0), defaults to 1.0
 * @returns A motion object with validated strength
 * @throws BadInputError if motionId is empty or strength is invalid
 * @example
 * const motion = inputMotion('motion-uuid-123', 0.8);
 */
export function inputMotion(motionId: string, inputStrength: number = 1.0) {
    if (!motionId || typeof motionId !== 'string' || motionId.trim() === '') {
        throw new BadInputError('Motion ID must be a non-empty string');
    }
    return {
        id: motionId,
        strength: strength(inputStrength)
    }
}

/**
 * Quality options for Soul text-to-image generation
 * @example
 * quality: SoulQuality.HD // 1080p quality
 */
export const SoulQuality = {
    /** 720p quality */
    SD: '720p',
    /** 1080p quality */
    HD: '1080p'
} as const;

/**
 * Batch size options for Soul image generation
 * @example
 * batch_size: BatchSize.SINGLE // Generate 1 image
 * batch_size: BatchSize.QUAD   // Generate 4 images
 */
export const BatchSize = {
    /** Generate a single image */
    SINGLE: 1,
    /** Generate 4 images in one request */
    QUAD: 4
} as const;

/**
 * Acceptable image sizes for Soul text-to-image generation
 * All 13 supported resolutions categorized by aspect ratio
 * @example
 * width_and_height: SoulSize.LANDSCAPE_2048x1152
 * width_and_height: SoulSize.PORTRAIT_1536x2048
 * width_and_height: SoulSize.SQUARE_1536x1536
 */
export const SoulSize = {
    // Landscape formats
    /** 2048x1152 - Wide landscape format */
    LANDSCAPE_2048x1152: '2048x1152',
    /** 2048x1536 - Standard landscape format */
    LANDSCAPE_2048x1536: '2048x1536',
    /** 2016x1344 - Medium landscape format */
    LANDSCAPE_2016x1344: '2016x1344',
    /** 1696x960 - Compact landscape format */
    LANDSCAPE_1696x960: '1696x960',
    /** 1632x1088 - Small landscape format */
    LANDSCAPE_1632x1088: '1632x1088',
    // Portrait formats
    /** 1152x2048 - Tall portrait format */
    PORTRAIT_1152x2048: '1152x2048',
    /** 1536x2048 - Standard portrait format */
    PORTRAIT_1536x2048: '1536x2048',
    /** 1344x2016 - Medium portrait format */
    PORTRAIT_1344x2016: '1344x2016',
    /** 960x1696 - Compact portrait format */
    PORTRAIT_960x1696: '960x1696',
    /** 1088x1632 - Small portrait format */
    PORTRAIT_1088x1632: '1088x1632',
    // Square and mixed formats
    /** 1536x1536 - Square format */
    SQUARE_1536x1536: '1536x1536',
    /** 1536x1152 - Mixed landscape-leaning format */
    MIXED_1536x1152: '1536x1152',
    /** 1152x1536 - Mixed portrait-leaning format */
    MIXED_1152x1536: '1152x1536'
} as const;

/**
 * DoP (Director of Photography) model options for image-to-video generation
 * @example
 * model: DoPModel.TURBO // Fast generation with good quality
 * model: DoPModel.STANDARD // Best quality
 */
export const DoPModel = {
    /** Basic speed and quality */
    LITE: 'dop-lite',
    /** 2x speed with priority queue */
    TURBO: 'dop-turbo',
    /** Highest quality with priority queue */
    STANDARD: 'dop-standard'
} as const;

/**
 * Quality options for Speak speech-to-video generation
 * @example
 * quality: SpeakVideoQuality.HIGH // Best quality output
 */
export const SpeakVideoQuality = {
    /** Medium quality - faster generation */
    MID: 'mid',
    /** High quality - best results */
    HIGH: 'high'
} as const;

/**
 * Duration options for Speak speech-to-video generation (in seconds)
 * @example
 * duration: SpeakDuration.MEDIUM // 10 second video
 */
export const SpeakDuration = {
    /** 5 second video */
    SHORT: 5,
    /** 10 second video */
    MEDIUM: 10,
    /** 15 second video */
    LONG: 15
} as const;

/**
 * Creates a webhook configuration object
 * @param url - The webhook endpoint URL
 * @param secret - The secret key for webhook authentication (sent as X-Webhook-Secret-Key header)
 * @returns A webhook configuration object
 * @throws BadInputError if URL or secret is empty
 * @example
 * const webhookConfig = webhook('https://api.example.com/callback', 'my-secret-key');
 */
export function webhook(url: string, secret: string) {
    if (!url || typeof url !== 'string' || url.trim() === '') {
        throw new BadInputError('Webhook URL must be a non-empty string');
    }
    if (!secret || typeof secret !== 'string' || secret.trim() === '') {
        throw new BadInputError('Webhook secret must be a non-empty string');
    }
    return {
        url,
        secret
    };
}

/**
 * Validates and returns a strength value for image/style references
 * @param value - The strength value (must be between 0.0 and 1.0)
 * @returns The validated strength value
 * @throws BadInputError if value is not between 0 and 1
 * @example
 * const validStrength = strength(0.8); // Returns 0.8
 * const invalidStrength = strength(1.5); // Throws BadInputError
 */
export function strength(value: number): number {
    if (value < 0 || value > 1) {
        throw new BadInputError('Strength must be between 0 and 1');
    }
    return value;
}

/**
 * Validates or generates a seed value for reproducible generation
 * @param value - The seed value (0 to 1,000,000) or null for random generation
 * @returns A valid seed number between 0 and 1,000,000
 * @throws BadInputError if value is not between 0 and 1,000,000
 * @example
 * const fixedSeed = seed(42); // Returns 42
 * const randomSeed = seed(null); // Returns random number between 0-1,000,000
 * const randomSeed2 = seed(); // Returns random number between 0-1,000,000
 */
export function seed(value: number | null = null): number {
    if (value === null) {
        // Generate random seed between 0 and 1,000,000
        return Math.floor(Math.random() * 1000001);
    }
    
    if (!Number.isInteger(value) || value < 0 || value > 1000000) {
        throw new BadInputError('Seed must be an integer between 0 and 1,000,000');
    }
    
    return value;
}

/**
 * Genjutsu video-to-video endpoint ids (v2 client)
 * @example
 * await higgsfield.subscribe(GenjutsuEndpoint.RESTYLE, { input, withPolling: true });
 */
export const GenjutsuEndpoint = {
    /** Change the visual style of a source video, keeping motion, composition and audio */
    RESTYLE: 'higgsfield/genjutsu/restyle/v1.0',
    /** Transfer the motion of a source video onto image references */
    MOTION_TRANSFER: 'higgsfield/genjutsu/motion-transfer/v1.0',
    /** Replace objects in a source video (>=409,600 px per frame) with image references */
    OBJECT_SWAP: 'higgsfield/genjutsu/object-swap/v1.0'
} as const;

/**
 * Output resolution options for Genjutsu endpoints (default 720p)
 * @example
 * resolution: GenjutsuResolution.SD // cheapest
 */
export const GenjutsuResolution = {
    /** 480p */
    SD: '480p',
    /** 720p (default) */
    HD: '720p',
    /** 1080p */
    FULL_HD: '1080p'
} as const;

/**
 * Genjutsu Restyle style preset ids (send the id as `preset_id`, not the name).
 * Snapshot of GET /models/higgsfield/genjutsu/restyle/v1.0/presets; fetch it for the live list.
 * @example
 * preset_id: GenjutsuRestylePreset.CEL_SHADED_CG_ANIME
 */
export const GenjutsuRestylePreset = {
    /** Cel-Shaded CG Anime */
    CEL_SHADED_CG_ANIME: 'c2143317-f28d-4c3c-a0b8-39bd547e08a7',
    /** Chunky Textured Low-Poly */
    CHUNKY_TEXTURED_LOW_POLY: 'f1d0c30d-a2ec-4c33-a892-d8d158e2d093',
    /** Comic 3D */
    COMIC_3D: '3dc6d454-808d-4e27-8a4e-4751da818324',
    /** Expressive 2D Animation */
    EXPRESSIVE_2D_ANIMATION: '368c6a65-4a48-4e3a-80c7-c460455b5e17',
    /** Expressive Gouache Fashion */
    EXPRESSIVE_GOUACHE_FASHION: '89484749-e1b9-40c9-979e-fc578c3aad6d',
    /** Felt Puppet Stop Motion */
    FELT_PUPPET_STOP_MOTION: 'bf6aee41-83a8-433c-b5a5-2309c7bd5b26',
    /** Graphic Cel */
    GRAPHIC_CEL: '523cf5be-67fc-46d6-bfdb-56ccc3e2a8f6',
    /** Grotesque Street CGI */
    GROTESQUE_STREET_CGI: 'c3268f8d-4cc0-423c-975d-ca1bf7df385a',
    /** Hand-Painted Cel Animation */
    HAND_PAINTED_CEL_ANIMATION: '067b27d4-8d8f-44d1-a24b-0f4c28012e4b',
    /** Knitted Yarn World */
    KNITTED_YARN_WORLD: '2b5b68c4-9253-4d79-9d05-81e7718d8d7a',
    /** Neon Graphic Cinematic 3D */
    NEON_GRAPHIC_CINEMATIC_3D: '41d02f6d-1d5d-4efa-9942-9fe71de9429b',
    /** Nighttime Anime Pixel Art */
    NIGHTTIME_ANIME_PIXEL_ART: 'e54beac7-ca48-4034-856b-0a6f2b05081a',
    /** Outline-free Cel */
    OUTLINE_FREE_CEL: '55aee79b-bb36-40e3-b957-205e6867a3d9',
    /** Painterly Cinematic 3D */
    PAINTERLY_CINEMATIC_3D: '85bc9e2c-f896-41d7-b280-53f2f5e321ac',
    /** Painterly Sculpted Animation */
    PAINTERLY_SCULPTED_ANIMATION: '083abd05-afbd-4cda-857f-7f2d2082e9b2',
    /** Retro Game 3D */
    RETRO_GAME_3D: '255f5244-b43d-43fc-9c28-7138f8c12984',
    /** Rounded Toy CGI */
    ROUNDED_TOY_CGI: '6bce8e75-df92-487f-a4f0-a324a6a297f3',
    /** Sculptural 3D Fashion */
    SCULPTURAL_3D_FASHION: 'f7786536-123b-47b8-ab65-ee0647df1509',
    /** Textured Gouache Character Illustration */
    TEXTURED_GOUACHE_CHARACTER_ILLUSTRATION: 'f2b4e920-3b1e-4931-8a86-b06566005145',
    /** Warm Painterly 3D Animation */
    WARM_PAINTERLY_3D_ANIMATION: 'e82b7bbb-c8bf-4d70-a866-e7b15e744a2b'
} as const;

/**
 * Display names for GenjutsuRestylePreset ids
 * @example
 * GenjutsuRestylePresetName[GenjutsuRestylePreset.COMIC_3D] // 'Comic 3D'
 */
export const GenjutsuRestylePresetName: Record<string, string> = {
    'c2143317-f28d-4c3c-a0b8-39bd547e08a7': 'Cel-Shaded CG Anime',
    'f1d0c30d-a2ec-4c33-a892-d8d158e2d093': 'Chunky Textured Low-Poly',
    '3dc6d454-808d-4e27-8a4e-4751da818324': 'Comic 3D',
    '368c6a65-4a48-4e3a-80c7-c460455b5e17': 'Expressive 2D Animation',
    '89484749-e1b9-40c9-979e-fc578c3aad6d': 'Expressive Gouache Fashion',
    'bf6aee41-83a8-433c-b5a5-2309c7bd5b26': 'Felt Puppet Stop Motion',
    '523cf5be-67fc-46d6-bfdb-56ccc3e2a8f6': 'Graphic Cel',
    'c3268f8d-4cc0-423c-975d-ca1bf7df385a': 'Grotesque Street CGI',
    '067b27d4-8d8f-44d1-a24b-0f4c28012e4b': 'Hand-Painted Cel Animation',
    '2b5b68c4-9253-4d79-9d05-81e7718d8d7a': 'Knitted Yarn World',
    '41d02f6d-1d5d-4efa-9942-9fe71de9429b': 'Neon Graphic Cinematic 3D',
    'e54beac7-ca48-4034-856b-0a6f2b05081a': 'Nighttime Anime Pixel Art',
    '55aee79b-bb36-40e3-b957-205e6867a3d9': 'Outline-free Cel',
    '85bc9e2c-f896-41d7-b280-53f2f5e321ac': 'Painterly Cinematic 3D',
    '083abd05-afbd-4cda-857f-7f2d2082e9b2': 'Painterly Sculpted Animation',
    '255f5244-b43d-43fc-9c28-7138f8c12984': 'Retro Game 3D',
    '6bce8e75-df92-487f-a4f0-a324a6a297f3': 'Rounded Toy CGI',
    'f7786536-123b-47b8-ab65-ee0647df1509': 'Sculptural 3D Fashion',
    'f2b4e920-3b1e-4931-8a86-b06566005145': 'Textured Gouache Character Illustration',
    'e82b7bbb-c8bf-4d70-a866-e7b15e744a2b': 'Warm Painterly 3D Animation'
};
