// Draws `img` onto `ctx` as square pixel blocks of `block` CSS pixels.
// `fit: "cover"` crops like CSS object-cover, centered.
let scratch: HTMLCanvasElement | null = null;

export function drawPixelated(
  ctx: CanvasRenderingContext2D,
  img: CanvasImageSource & { naturalWidth: number; naturalHeight: number },
  width: number,
  height: number,
  block: number,
  { fit = "cover", alpha = 1, background }: { fit?: "cover" | "contain"; alpha?: number; background?: string } = {}
) {
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  if (!iw || !ih || !width || !height) return;

  const scale = fit === "cover" ? Math.max(width / iw, height / ih) : Math.min(width / iw, height / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  const dx = (width - dw) / 2;
  const dy = (height - dh) / 2;

  const sw = Math.max(1, Math.ceil(width / block));
  const sh = Math.max(1, Math.ceil(height / block));
  scratch ??= document.createElement("canvas");
  scratch.width = sw;
  scratch.height = sh;
  const sctx = scratch.getContext("2d");
  if (!sctx) return;

  // Downscale with smoothing so each block is the average colour of its area.
  sctx.imageSmoothingEnabled = true;
  sctx.clearRect(0, 0, sw, sh);
  sctx.drawImage(img, dx / block, dy / block, dw / block, dh / block);

  ctx.imageSmoothingEnabled = false;
  if (background) {
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width, height);
  } else {
    ctx.clearRect(0, 0, width, height);
  }
  ctx.globalAlpha = alpha;
  ctx.drawImage(scratch, 0, 0, sw, sh, 0, 0, sw * block, sh * block);
  ctx.globalAlpha = 1;
}

/**
 * A blurred copy of `img`, cropped like CSS object-cover into `width` x
 * `height` and returned at a quarter of that size (stretch it back with
 * smoothing on). It blurs by shrinking the photo until every sample averages
 * `radius` px and growing it again, so it needs no canvas filter support.
 * `lift` mixes in that much white.
 */
export function blurredCover(
  img: CanvasImageSource & { naturalWidth: number; naturalHeight: number },
  width: number,
  height: number,
  radius: number,
  { alpha = 1, background, lift = 0 }: { alpha?: number; background?: string; lift?: number } = {}
) {
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  if (!iw || !ih || !width || !height) return null;

  const small = document.createElement("canvas");
  small.width = Math.max(1, Math.ceil(width / radius));
  small.height = Math.max(1, Math.ceil(height / radius));
  const out = document.createElement("canvas");
  out.width = Math.max(1, Math.ceil(width / 4));
  out.height = Math.max(1, Math.ceil(height / 4));
  const sctx = small.getContext("2d");
  const octx = out.getContext("2d");
  if (!sctx || !octx) return null;

  const fx = small.width / width;
  const fy = small.height / height;
  const scale = Math.max(width / iw, height / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  sctx.imageSmoothingQuality = "high";
  if (background) {
    sctx.fillStyle = background;
    sctx.fillRect(0, 0, small.width, small.height);
  }
  sctx.globalAlpha = alpha;
  sctx.drawImage(img, ((width - dw) / 2) * fx, ((height - dh) / 2) * fy, dw * fx, dh * fy);
  if (lift) {
    sctx.globalAlpha = lift;
    sctx.fillStyle = "#fff";
    sctx.fillRect(0, 0, small.width, small.height);
  }

  octx.imageSmoothingQuality = "high";
  octx.drawImage(small, 0, 0, out.width, out.height);
  return out;
}
