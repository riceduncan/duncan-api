const express = require('express')
const { AnnouncementService } = require('../services')
const jwt = require('../../utils/jwt')

const router = new express.Router()

router.get('/', async (req, res) => {
  try {
    const announcements = await AnnouncementService.getAllAnnouncements()
    res.status(200).json(announcements)
  } catch (err) {
    res.status(err.status).json(err)
  }
})

router.post('/', jwt.validate, jwt.checkAccess, async (req, res) => {
  try {
    const announcement = await AnnouncementService.createAnnouncement(req.body)
    res.status(201).json(announcement)
  } catch (err) {
    console.log(err.status)
    res.status(err.status).json(err)
  }
})

router.get('/:announcementId', async (req, res) => {
  try {
    const announcement = await AnnouncementService.getAnnouncementById(req.params.announcementId)
    res.status(200).json(announcement)
  } catch (err) {
    res.status(err.status).json(err)
  }
})

router.put('/:announcementId', jwt.validate, jwt.checkAccess, async (req, res) => {
  try {
    const announcement = await AnnouncementService.updateAnnouncement(req.body, req.params.announcementId)
    res.status(200).json(announcement)
  } catch (err) {
    res.status(err.status).json(err)
  }
})

router.delete('/:announcementId', jwt.validate, jwt.checkAccess, async (req, res) => {
  try {
    const announcement = await AnnouncementService.deleteAnnouncement(req.params.announcementId)
    res.status(200).json(announcement)
  } catch (err) {
    res.status(err.status).json(err)
  }
})

module.exports = router