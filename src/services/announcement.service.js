const { Announcement } = require('../models')
const APIError = require('../../utils/error')

const getAllAnnouncements = async () => {
  return Announcement.find({})
}

const getAnnouncementById = async (announcementId) => {
  const announcement = Announcement.findById({ _id: announcementId })
  if(!announcement) throw new APIError('Announcement Not Found', 404)
  return announcement
}

const createAnnouncement = async (newAnnouncement) => {
  const { error, value } = Announcement.validateObject(newAnnouncement)
  if(error) throw new APIError('Invalid Model', 400)

  const announcement = new Announcement(value)
  return announcement.save()
}

const updateAnnouncement = async (newAnnouncement, announcementId) => {
  const { error, value } = Announcement.validateObject(newAnnouncement)
  if(error) throw new APIError('Invalid Model', 400)

  const announcement = Announcement.findByIdAndUpdate({ _id: announcementId }, value)
  return announcement
}

const deleteAnnouncement = async (announcementId) => {
  const announcement = Announcement.findByIdAndDelete({ _id: announcementId })
  if(!announcement) throw new APIError('Announcement Not Found', 404)
  return announcement
}

module.exports = {
  getAllAnnouncements,
  getAnnouncementById,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement
}