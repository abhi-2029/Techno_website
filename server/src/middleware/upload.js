/**
 * CARD Technocrats & Engineers LLP - Express Request Middleware Filter
 * 
 * Senior Developer Notes:
 * - Intercepts incoming payloads for JWT decoding, uploads, or error mapping.
 */

import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (_req, file) => {
    let folder = 'card-technocrats/uploads';
    let resourceType = 'auto';

    if (file.mimetype.startsWith('image/')) {
      folder = 'card-technocrats/images';
      resourceType = 'image';
    } else if (file.mimetype === 'application/pdf') {
      folder = 'card-technocrats/documents';
      resourceType = 'raw';
    } else {
      folder = 'card-technocrats/files';
      resourceType = 'raw';
    }

    return {
      folder,
      resource_type: resourceType,
      allowed_formats: [
        'jpg',
        'jpeg',
        'png',
        'gif',
        'webp',
        'svg',
        'pdf',
        'doc',
        'docx',
        'xls',
        'xlsx',
        'zip',
      ],
    };
  },
});

const fileFilter = (_req, file, cb) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/zip',
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`File type ${file.mimetype} is not supported.`), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
});

export const uploadSingle = (fieldName) => upload.single(fieldName);

export const uploadMultiple = (fieldName, max = 10) =>
  upload.array(fieldName, max);
