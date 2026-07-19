import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    action: {
      type: String,
      required: true,
      enum: ['CREATE', 'UPDATE', 'DELETE'],
    },
    targetModel: {
      type: String,
      required: true,
    },
    targetId: {
      type: mongoose.Schema.Types.Mixed, // Could be ObjectId or slug depending on route
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
    },
    ipAddress: String,
  },
  {
    timestamps: true,
  }
);

auditLogSchema.index({ adminId: 1 });
auditLogSchema.index({ targetModel: 1, targetId: 1 });

const AuditLog = mongoose.model('AuditLog', auditLogSchema);
export default AuditLog;
