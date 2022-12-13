interface IntRoom {
	name: string, 
	bookings: Booking[], 
	rate: number, 
	discount: number
}

interface IntBooking {
   name: string;
   email: string;
   checkIn: string;
   checkOut: string;
   discount: number;
   room: Room
}

class Room implements IntRoom {
   name: string;
   bookings: Booking[];
   rate: number;
   discount: number;

   constructor(room: IntRoom) {
      this.name = room.name;
      this.bookings = room.bookings;
      this.rate = room.rate;
      this.discount = room.discount;
   }

   //create range of date to map
   rangeDates(start: string, end: string): string[] {
      let range: string[] = [];
      let startDate = new Date(start);
      let endDate = new Date(end);

      while (startDate <= endDate) {
         range = [...range, startDate.toISOString().slice(0, 10)];
         startDate.setDate(startDate.getDate() + 1);
      }
      return range;
   }

   //bool returns id or false if occupied in date provided as param
   isOccupied(date: string) {
      const currentDate = new Date(date);
      let name: string | undefined;
      this.bookings.forEach((b) => {
         const checkIn = new Date(b.checkIn);
         const checkOut = new Date(b.checkOut);
         if (checkIn <= currentDate && checkOut >= currentDate) {
            name = b.name;
         }
      });
      return name ? name : false;
   }

   occupancyPercentage(start: string, end: string) {
      const range = this.rangeDates(start, end);
      let numOccupied: number = 0;
      range.forEach((date) => {
         if (this.isOccupied(date) !== false) {
            return (numOccupied += 1);
         }
      });
      const totalPercentage = (numOccupied * 100) / range.length;
      return totalPercentage;
   }

   static totalOccupancyPercentage(
      rooms: Room[],
      startRange: string,
      endRange: string
   ) {
      let totalRange: number = 0;
      let daysBooked: number = 0;

      rooms.forEach((room) => {
         room.bookings &&
            room.bookings.forEach((booking) => {
               const dateNumber = (date: string) => {
                  return new Date(date).getTime();
               };

               totalRange = dateNumber(endRange) - dateNumber(startRange);

               if (
                  dateNumber(booking.checkIn) >= dateNumber(startRange) &&
                  dateNumber(booking.checkOut) <= dateNumber(endRange)
               ) {
                  daysBooked +=
                     dateNumber(booking.checkOut) - dateNumber(booking.checkIn);
               }
            });
      });
      return (
         (new Date(daysBooked).getDate() * 100) / new Date(totalRange).getDate()
      );
   }

   static availableRooms(rooms: Room[], startDate: string, endDate: string) {
      //const range = this.prototype.rangeDates(startDate, endDate) Static method call to non-static
      let availableRooms :Room[] = [];

      rooms.forEach((room) => {
         if (roomAvailable(room, startDate, endDate)) {
            availableRooms = [...availableRooms, room];
         }
      });
      return availableRooms;
   }
}



//BOOKING
class Booking implements IntBooking {
   name: string;
   email: string;
   checkIn: string;
   checkOut: string;
   discount: number;
   room: Room;

   constructor(booking: IntBooking) {
      this.name = booking.name;
      this.email = booking.email;
      this.checkIn = booking.checkIn;
      this.checkOut = booking.checkOut;
      this.discount = booking.discount;
      this.room = booking.room;
   }

   getFee() :number {
      const totalDiscount :number =
         this.discount + this.room.discount >= 100
            ? 100
            : this.discount + this.room.discount;
      const dateRange = this.room.rangeDates(this.checkIn, this.checkOut);
      const totalPrice = (dateRange.length - 1) * this.room.rate;
      const priceWithDiscount = totalPrice - (totalDiscount / 100) * totalPrice;

      return priceWithDiscount;
   }
}


function roomAvailable(room: Room, startDate: string, endDate: string) {
   room.bookings.forEach((booking) => {
      if (
         new Date(booking.checkIn).getDate() >= new Date(startDate).getDate() &&
         new Date(booking.checkOut).getDate() < new Date(endDate).getDate()
      ) {
         return false;
      }
   });

   return true;
}