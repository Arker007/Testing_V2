/**
 * Media Service
 * Business logic for media and certifications.
 */
const mediaRepository = require("./media.repository");
const mediaMapper = require("./media.mapper");

class MediaService {
  /**
   * Get all media files.
   */
  async getAllMedia() {
    const rows = await mediaRepository.findAllMedia();
    const media = rows.map(mediaMapper.toMediaDomain);
    return { media };
  }

  /**
   * Create new media record.
   */
  async createMedia(mediaData) {
    const persistenceData = mediaMapper.toMediaPersistence(mediaData);
    const result = await mediaRepository.createMedia(persistenceData);
    return { success: true, id: result.lastID };
  }

  /**
   * Get all certifications.
   */
  async getAllCertifications() {
    const rows = await mediaRepository.findAllCertifications();
    const certifications = rows.map(mediaMapper.toCertificationDomain);
    return { certifications };
  }
}

module.exports = new MediaService();
