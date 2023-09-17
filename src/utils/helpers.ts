import moment from "moment";

export function getAge(dateString: string) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const yearNow = now.getFullYear();
    const monthNow = now.getMonth();
    const dateNow = now.getDate();

    const dob = moment(dateString, "YYYY-MM-DD");

    const yearDob = dob.year();
    const monthDob = dob.month();
    const dateDob = dob.date();

    let age = {
        years: 0,
        months: 0,
        days: 0
    };
    let yearAge = yearNow - yearDob;

    let monthAge = 0;

    if (monthNow >= monthDob) monthAge = monthNow - monthDob;
    else {
        yearAge--;
        monthAge = 12 + monthNow - monthDob;
    }

    if (dateNow >= dateDob) var dateAge = dateNow - dateDob;
    else {
        monthAge--;
        var dateAge = 31 + dateNow - dateDob;

        if (monthAge < 0) {
            monthAge = 11;
            yearAge--;
        }
    }

    age = {
        years: yearAge,
        months: monthAge,
        days: dateAge,
    };

    return age;
}
