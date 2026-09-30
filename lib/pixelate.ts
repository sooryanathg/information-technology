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
