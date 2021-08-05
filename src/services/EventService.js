import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://api.instantwebtools.net/v1/passenger',
})

export default {
  getPassengers(page) {
    return apiClient.get(`?page=${page}&size=7`)
  },

  getPassenger(id) {
    return apiClient.get('/' + id)
  },
  updatePassenger(id, data = { name: '', trips: '' }) {
    return apiClient.put(`/${id}`, data)
  }
}
