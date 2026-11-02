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

/** Output resolution for Genjutsu video-to-video endpoints */
export type GenjutsuOutputResolution = '480p' | '720p' | '1080p';

/**
 * Input for `higgsfield/genjutsu/restyle/v1.0`.
 * Restyles a source video (>=4 s, <=200 MiB; >30 s is trimmed to the first 30 s)
 * while keeping motion, composition and source audio. `null` is not accepted for any field.
 */
export interface GenjutsuRestyleInput {
  /** Source video URL */
  video_url: string;
  /** Style preset UUID (see GenjutsuRestylePreset or GET /models/higgsfield/genjutsu/restyle/v1.0/presets) */
  preset_id: string;
  /** Up to 5 character appearance references (JPEG/PNG, <=64 MiB each). Defaults to [] */
  image_urls?: string[];
  /** Extra guidance (max 10000 chars); does not replace the preset. Defaults to "" */
  prompt?: string;
  /** Defaults to "720p" */
  resolution?: GenjutsuOutputResolution;
}

/**
 * Input for `higgsfield/genjutsu/motion-transfer/v1.0`.
 * Transfers the motion of the source video (>=4 s; >30 s trimmed) onto 1-8 ordered image references.
 */
export interface GenjutsuMotionTransferInput {
  /** Source video URL (1-2083 chars) */
  video_url: string;
  /** 1-8 ordered image reference URLs */
  image_urls: string[];
  /** Extra guidance (max 10000 chars). Defaults to "" */
  prompt?: string;
  /** Defaults to "720p" */
  resolution?: GenjutsuOutputResolution;
}

/**
 * Input for `higgsfield/genjutsu/object-swap/v1.0`.
 * Same inputs as motion transfer; the source video must have >=409,600 px per frame (e.g. 1280x720).
 */
export type GenjutsuObjectSwapInput = GenjutsuMotionTransferInput;

/** Style preset returned by GET /models/higgsfield/genjutsu/restyle/v1.0/presets */
export interface GenjutsuRestylePresetItem {
  id: string;
  name: string;
  preview_url: string;
}
