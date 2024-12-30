import PastBooking from "@/components/user/booking/PastBookings"
import UpcomingBooking from "@/components/user/booking/UpcomingBooking"
import ProfileInfo from "@/components/user/ProfileInfo"
import { auth } from '@/auth';
import { redirect } from "next/navigation";
const BookingPage = async () => {
    const session = await auth();

    if (!session) {
        redirect("/login")
    }
    return (
        <>
            <section className="mt-[100px]">
                <div className="container">
                    <ProfileInfo />
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <PastBooking />
                        <UpcomingBooking />
                    </div>
                </div>
            </section>
        </>
    )
}

export default BookingPage