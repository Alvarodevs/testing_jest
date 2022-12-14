import { Room, Booking } from './index';

const roomTemplate :Room = new Room({
	name: 'Cool Suite',
	bookings: [],
	rate: 100,
	discount: 10,
})

const bookingTemplate :Booking = new Booking({
   name: "Chiquito",
   email: "gromenaur@jarl.com",
   checkIn: "2021-04-01",
   checkOut: "2021-04-05",
   discount: 20,
   room: roomTemplate,
});

const bookingTemplate2: Booking = new Booking({
   name: "Chiquito",
   email: "gromenaur@jarl.com",
   checkIn: "2021-04-10",
   checkOut: "2021-04-15",
   discount: 20,
   room: roomTemplate,
});

describe("Room", () => {
	test('is not occupied', () => {
		const booking1 = new Booking({ ...bookingTemplate })
		const room1 = new Room({ ...roomTemplate, bookings: [booking1] })
		expect(room1.isOccupied("2021-04-25")).toBe(false)
	})

	test('is occupied', () => {
		const booking1 = new Booking({ ...bookingTemplate })
		const room1 = new Room({ ...roomTemplate, bookings: [booking1] })
		expect(room1.isOccupied("2021-04-04")).toBe('Chiquito')
	})

	test('occupancy', () => {
		const room1 = new Room(
			{
				...roomTemplate,
				bookings: [bookingTemplate, bookingTemplate2]
			}
		);
		expect(room1.occupancyPercentage('2021-04-01', '2021-04-05')).toBe(100)
	})

	test('total occupancy percentage', () => {
		let room1 :Room = new Room({ ...roomTemplate});
		let room2 :Room = new Room({ ...roomTemplate, name: 'Better suite', })
		const booking1 = new Booking({ ...bookingTemplate, room: room1 })
		const booking2 = new Booking({ ...bookingTemplate, checkIn: '2021-04-05', checkOut: '2021-04-10', room: room1 })
		const booking3 = new Booking({ ...bookingTemplate, checkIn: '2021-04-15', checkOut: '2021-04-30', room: room1 })
		const booking4 = new Booking({ ...bookingTemplate2, room: room2 })
		const booking5 = new Booking({ ...bookingTemplate2, checkIn: '2021-05-01', checkOut: '2021-05-02', room: room2 })
		const booking6 = new Booking({ ...bookingTemplate2, checkIn: '2021-05-18', checkOut: '2021-05-20', room: room2 })
		room1.bookings = [booking1, booking2, booking3]
		room2.bookings = [booking4, booking5, booking6]

		const rooms = [room1, room2];
		expect(Room.totalOccupancyPercentage(rooms, '2021-04-01', '2021-04-30')).toBe(100)
	})

	test('is available', () => {
		let room1 = new Room({ ...roomTemplate, })
		let room2 = new Room({ ...roomTemplate, name: 'Better suite', })
		const booking1 = new Booking({ ...bookingTemplate, room: room1 })
		const booking2 = new Booking({ ...bookingTemplate, checkIn: '2021-04-05', checkOut: '2021-04-10', room: room1 })
		const booking3 = new Booking({ ...bookingTemplate, checkIn: '2021-04-20', checkOut: '2021-04-22', room: room1 })
		const booking4 = new Booking({ ...bookingTemplate2, checkIn: '2021-05-01', checkOut: '2021-05-05', room: room2 })
		const booking5 = new Booking({ ...bookingTemplate2, checkIn: '2021-05-05', checkOut: '2021-05-10', room: room2 })
		const booking6 = new Booking({ ...bookingTemplate2, checkIn: '2021-05-20', checkOut: '2021-05-22', room: room2 })
		room1.bookings = [booking1, booking2, booking3];
      room2.bookings = [booking4, booking5, booking6];
		const rooms = [room1, room2];

		expect(Room.availableRooms(rooms, '2021-05-20', '2021-05-22'))
	})

	test('is available', () => {
		let room1 = new Room({ ...roomTemplate, })
		let room2 = new Room({ ...roomTemplate, name: 'Better suite', })
		const booking1 = new Booking({ ...bookingTemplate, room: room1 })
		const booking2 = new Booking({ ...bookingTemplate, checkIn: '2021-04-05', checkOut: '2021-04-10', room: room1 })
		const booking3 = new Booking({ ...bookingTemplate, checkIn: '2021-04-20', checkOut: '2021-04-22', room: room1 })
		const booking4 = new Booking({ ...bookingTemplate2, checkIn: '2021-05-01', checkOut: '2021-05-05', room: room2 })
		const booking5 = new Booking({ ...bookingTemplate2, checkIn: '2021-05-05', checkOut: '2021-05-10', room: room2 })
		const booking6 = new Booking({ ...bookingTemplate2, checkIn: '2021-05-20', checkOut: '2021-05-22', room: room2 })
		room1.bookings = [booking1, booking2, booking3];
      room2.bookings = [booking4, booking5, booking6];
		const rooms = [room1, room2];

		expect(Room.availableRooms(rooms, '2021-06-05', '2021-06-08'))
	})
})

describe('Booking', () => {
	test('fee discounts included', () => {
		let booking1 = new Booking({ ...bookingTemplate })
		const room1 = new Room({ ...roomTemplate, bookings: [booking1] })
		booking1 = new Booking({ ...bookingTemplate, room: room1 })
		expect(booking1.getFee()).toBe(280)
	})

	test('fee 0 discounts included', () => {
		let booking1 = new Booking({ ...bookingTemplate })
		const room1 = new Room({ ...roomTemplate, discount: 0, bookings: [booking1] })
		booking1 = new Booking({ ...bookingTemplate, room: room1, discount: 0 })
		expect(booking1.getFee()).toBe(400)
	})

	test('fee 100 discounts included', () => {
		let booking1 = new Booking({ ...bookingTemplate })
		const room1 = new Room({ ...roomTemplate, discount: 60, bookings: [booking1] })
		booking1 = new Booking({ ...bookingTemplate, room: room1, discount: 60 })
		expect(booking1.getFee()).toBe(0)
	})
})