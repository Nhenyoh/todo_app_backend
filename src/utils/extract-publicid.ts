export function extractCloudinaryPublicId(url: string): string | null {
  try {
    const parts = url.split('/');
    const fileName = parts[parts.length - 1];
    const folder = parts[parts.length - 2];
    const nameWithoutExt = fileName.split('.')[0];
    return `${folder}/${nameWithoutExt}`;
  } catch (e) {
    console.error('Failed to extract Cloudinary public ID:', e);
    return null;
  }
}
