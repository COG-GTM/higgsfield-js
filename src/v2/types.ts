// Base endpoint input types for known endpoints
export interface DoPImage2VideoInput {
  model: 'dop-lite' | 'dop-turbo' | 'dop-standard';
  prompt: string;
  input_images: Array<{
    type: 'image_url';
    image_url: string;
  }>;
  motions?: Array<{
    id: string;
    strength: number;
  }>;
  seed?: number;
  enhance_prompt?: boolean;
}

export interface SpeakVideoInput {
  input_image: {
    type: 'image_url';
    image_url: string;
  };
  input_audio: {
    type: 'audio_url';
    audio_url: string;
  };
  prompt: string;
  quality: 'mid' | 'high';
  duration: 5 | 10 | 15;
  seed?: number;
}

export interface SoulText2ImageInput {
  prompt: string;
  width_and_height: string;
  quality: '720p' | '1080p';
  batch_size: 1 | 4;
  style_id?: string;
  style_strength?: number;
  custom_reference_id?: string;
  custom_reference_strength?: number;
  image_reference?: {
    type: 'image_url';
    image_url: string;
  };
  enhance_prompt?: boolean;
  seed?: number;
}

// Genjutsu video-to-video endpoint inputs (https://docs.higgsfield.ai/docs/models/genjutsu)
export type GenjutsuResolutionValue = '480p' | '720p' | '1080p';

export interface GenjutsuRestyleInput {
  /** Source video URL (4–30 s, ≤200 MiB; longer clips are trimmed to 30 s) */
  video_url: string;
  /** Style preset UUID from GET /models/higgsfield/genjutsu/restyle/v1.0/presets */
  preset_id: string;
  /** Optional guidance alongside the preset (max 10000 chars, default "") */
  prompt?: string;
  /** Optional character reference image URLs (max 5, default []) */
  image_urls?: string[];
  /** Output resolution tier (default "720p") */
  resolution?: GenjutsuResolutionValue;
}

export interface GenjutsuMotionTransferInput {
  /** Source video URL supplying the motion (≥4 s; trimmed to 30 s) */
  video_url: string;
  /** Ordered character reference image URLs (1–8) */
  image_urls: string[];
  /** Optional text instructions (max 10000 chars, default "") */
  prompt?: string;
  /** Output resolution tier (default "720p") */
  resolution?: GenjutsuResolutionValue;
}

export interface GenjutsuObjectSwapInput {
  /** Source video URL (≥4 s; trimmed to 30 s; ≥409,600 pixels per frame) */
  video_url: string;
  /** Ordered reference image URLs of the replacement object/character (1–8) */
  image_urls: string[];
  /** Optional text instructions (max 10000 chars, default "") */
  prompt?: string;
  /** Output resolution tier (default "720p") */
  resolution?: GenjutsuResolutionValue;
}

export interface GenjutsuRestylePresetItem {
  id: string;
  name: string;
  preview_url: string;
}

export interface GenjutsuRestylePresetsResponse {
  model: string;
  items: GenjutsuRestylePresetItem[];
}

// Endpoint to Input Type Mapping for built-in endpoints
export interface EndpointInputMap {
  '/v1/image2video/dop': DoPImage2VideoInput;
  '/v1/speak/higgsfield': SpeakVideoInput;
  '/v1/text2image/soul': SoulText2ImageInput;
  'higgsfield/genjutsu/restyle/v1.0': GenjutsuRestyleInput;
  'higgsfield/genjutsu/motion-transfer/v1.0': GenjutsuMotionTransferInput;
  'higgsfield/genjutsu/object-swap/v1.0': GenjutsuObjectSwapInput;
}

// Helper type to extract input type from endpoint
export type EndpointInput<TEndpoint extends keyof EndpointInputMap> = 
  EndpointInputMap[TEndpoint];

// Model schema from backend/CMS
export interface ModelSchema {
  endpoint: string;
  name: string;
  description?: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, any>;
    required?: string[];
  };
}

export interface ModelSchemasResponse {
  models: ModelSchema[];
}

// V2 API Response Types
export type V2RequestStatus = 'queued' | 'in_progress' | 'completed' | 'failed' | 'nsfw';

export interface V2Image {
  url: string;
}

export interface V2Video {
  url: string;
}

export interface V2Response {
  status: V2RequestStatus;
  request_id: string;
  status_url: string;
  cancel_url: string;
  images?: V2Image[];
  video?: V2Video;
}

