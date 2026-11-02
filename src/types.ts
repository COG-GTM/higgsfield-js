export enum JobStatus {
  QUEUED = 'queued',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FAILED = 'failed',
  NSFW = 'nsfw',
  CANCELED = 'canceled'
}

export enum SoulIdStatus {
  NOT_READY = 'not_ready',
  QUEUED = 'queued',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

export enum InputImageType {
  IMAGE_URL = 'image_url'
}

export interface Result {
  url: string;
  type: string;
}

export type ResultKey = 'raw' | 'min';
export type Results = Record<ResultKey, Result>;

export interface Job {
  id: string;
  status: string;
  results?: Results | null;
}

export interface JobSetData {
  id: string;
  jobs: Job[];
}

export interface SoulIdData {
  id: string;
  name: string;
  status: SoulIdStatus;
}

export interface InputImageData {
  type: InputImageType
  image_url: string;
}

export interface SoulIdCreateData {
  name: string;
  input_images: InputImageData[];
}

export interface GenerateParams {
  [key: string]: any;
}

export interface WebhookPayload {
  url: string;
  secret: string;
}

export interface UploadResponse {
  upload_url: string;
  public_url: string;
}

export interface SoulStyle {
  id: string;
  name: string;
  description: string;
  preview_url: string;
}

export interface Motion {
  id: string;
  name: string;
  description?: string;
  preview_url?: string;
  start_end_frame?: boolean;
}

export interface SoulIdListResponse {
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
  items: SoulIdData[];
}

/** Output resolution tiers accepted by the Genjutsu video-to-video endpoints */
export type GenjutsuResolutionValue = '480p' | '720p' | '1080p';

/**
 * Input for `higgsfield/genjutsu/restyle/v1.0`.
 * The API rejects any fields other than these five.
 */
export interface GenjutsuRestyleInput {
  /** Source video URL (≥4 s, ≤200 MiB; clips over 30 s are trimmed). Source audio is kept. */
  video_url: string;
  /** Style preset UUID from GET /models/higgsfield/genjutsu/restyle/v1.0/presets */
  preset_id: string;
  /** Character reference image URLs (0–5, ≤64 MiB each). Defaults to []; null is not accepted. */
  image_urls?: string[];
  /** Optional guidance alongside the preset (≤10000 chars, default "") */
  prompt?: string;
  /** Output resolution (default "720p") */
  resolution?: GenjutsuResolutionValue;
}

/** Input for `higgsfield/genjutsu/motion-transfer/v1.0` */
export interface GenjutsuMotionTransferInput {
  /** Source video URL supplying the motion (≥4 s; clips over 30 s are trimmed) */
  video_url: string;
  /** Character reference image URLs (1–8) */
  image_urls: string[];
  /** Optional text instructions (≤10000 chars, default "") */
  prompt?: string;
  /** Output resolution (default "720p") */
  resolution?: GenjutsuResolutionValue;
}

/** Input for `higgsfield/genjutsu/object-swap/v1.0` */
export interface GenjutsuObjectSwapInput {
  /** Source video URL (≥4 s, ≥409,600 px per frame, e.g. 1280x720; clips over 30 s are trimmed) */
  video_url: string;
  /** Reference image URLs of the replacement object or character (1–8) */
  image_urls: string[];
  /** Optional text instructions (≤10000 chars, default "") */
  prompt?: string;
  /** Output resolution (default "720p") */
  resolution?: GenjutsuResolutionValue;
}

export interface GenjutsuRestylePreset {
  id: string;
  name: string;
  preview_url: string;
}

export interface GenjutsuRestylePresetsResponse {
  model: string;
  items: GenjutsuRestylePreset[];
}
