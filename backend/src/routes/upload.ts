import { Router } from "express";
import { prisma } from "../lib/prisma";
import cloudinary from "../lib/cloudinary";

const router = Router();

/**
 * @swagger
 * /api/upload/id-card/register:
 *   post:
 *     summary: Upload ID card during registration
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [file, documentType]
 *             properties:
 *               file:
 *                 type: string
 *                 description: Base64 encoded file
 *               documentType:
 *                 type: string
 *                 description: Type of document (id_front, id_back, etc.)
 *     responses:
 *       200:
 *         description: File uploaded successfully
 */
router.post("/id-card/register", async (req, res) => {
  try {
    const { file, documentType } = req.body;

    if (!file || !documentType) {
      return res.status(400).json({ error: "File and document type are required" });
    }

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(file, {
      folder: 'kyc_documents',
      public_id: `${documentType}_${Date.now()}`,
      resource_type: 'auto',
    });

    const fileUrl = uploadResult.secure_url;

    res.json({ fileUrl });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
});

/**
 * @swagger
 * /api/upload/documents:
 *   get:
 *     summary: Get user's uploaded documents
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 */
router.get("/documents", async (req, res) => {
  try {
    // In a real implementation, fetch from database
    res.json({ documents: [] });
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ error: "Failed to fetch documents" });
  }
});

export default router;
