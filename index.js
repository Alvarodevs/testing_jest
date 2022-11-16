class Room {
	constructor({ name, bookings, rate, discount }) {
		this.name = name;
		this.bookings = bookings;
		this.rate = rate;
		this.discount = discount;
	}
	//create range of date to map
	rangeDates(start, end) {
		let range = [];
		let startDate = new Date(start);
		let endDate = new Date(end);

		while (startDate <= endDate) {
			range = [...range, startDate.toISOString().slice(0, 10)];
			startDate.setDate(startDate.getDate() + 1)
		}
		return range
	}

	//bool returns id or false if occupied in date provided as param
	isOccupied(date) {
		const currentDate = new Date(date)
		let name
		this.bookings.forEach((b) => {
			const checkIn = new Date(b.checkIn)
			const checkOut = new Date(b.checkOut)
			if (checkIn <= currentDate && checkOut >= currentDate) {
				name = b.name
			}
		});

		return name ? name : false
	}

	occupancyPercentage(start, end) {
		const range = this.rangeDates(start, end);
		let numOccupied = 0;
		range.forEach((date) => {
			if (this.isOccupied(date) !== false) {
				return numOccupied += 1
			}
		})
		const totalPercentage = ((numOccupied * 100) / range.length)
		return totalPercentage
	}

	static totalOccupancyPercentage(rooms, startRange, endRange) {
		let totalRange = 0
		let daysBooked = 0

		rooms.forEach((room) => {
			room.bookings && room.bookings.forEach((booking) => {
				const dateNumber = (date) => {
					return new Date(date).getTime();
				}

				totalRange = (dateNumber(endRange) - dateNumber(startRange))
			
				if (dateNumber(booking.checkIn) >= dateNumber(startRange) && dateNumber(booking.checkOut) <= dateNumber(endRange)) {
					daysBooked += (dateNumber(booking.checkOut) - dateNumber(booking.checkIn));	
				}
			})
		})
		return (new Date(daysBooked).getDate() * 100) / new Date(totalRange).getDate();
	}

	static availableRooms(rooms, startDate, endDate){
		//const range = this.prototype.rangeDates(startDate, endDate) Static method call to non-static
		let availableRooms = []
		
		rooms.forEach((room) => {
			if (roomIsAvailable(room, startDate, endDate)) {
				availableRooms = [...availableRooms, room];
			}
		});
		return availableRooms;
	}
}

function roomIsAvailable(room, startDate, endDate) {
	let available = true;

	room.bookings.forEach((booking) => {
		if (new Date(booking.checkIn).getDate() >= new Date(startDate).getDate() && new Date(booking.checkOut).getDate() < new Date(endDate).getDate()) {
			available = false;
		}
	});

	return available;
}

class Booking {
	constructor({ name, email, checkIn, checkOut, discount, room }) {
		this.name = name;
		this.email = email;
		this.checkIn = checkIn;
		this.checkOut = checkOut;
		this.discount = discount;
		this.room = room;
	}

	getFee() {
		const totalDiscount = this.discount + this.room.discount >= 100 ? 100 : this.discount + this.room.discount;
		const dateRange = this.room.rangeDates(this.checkIn, this.checkOut)
		const totalPrice = (dateRange.length-1) * this.room.rate
		const priceWithDiscount = (totalPrice - ((totalDiscount / 100) * totalPrice));

		console.log('HERE', totalDiscount, dateRange.length-1, totalPrice, priceWithDiscount)

		return priceWithDiscount

	}
}

module.exports = {
	Room, Booking
};