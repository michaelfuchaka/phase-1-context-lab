/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

// 1. Create a single employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
}

// 2. Create multiple employee records
function createEmployeeRecords(arrOfArrs) {
  return arrOfArrs.map(createEmployeeRecord);
}

// 3. Add a TimeIn event to `this`
function createTimeInEvent(dateTime) {
  const [date, hour] = dateTime.split(" ");
  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour),
    date,
  });
  return this;
}

// 4. Add a TimeOut event to `this`
function createTimeOutEvent(dateTime) {
  const [date, hour] = dateTime.split(" ");
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour),
    date,
  });
  return this;
}

// 5. Calculate hours worked on a specific date
function hoursWorkedOnDate(date) {
  const timeIn = this.timeInEvents.find(e => e.date === date);
  const timeOut = this.timeOutEvents.find(e => e.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
}

// 6. Calculate wages earned on a specific date
function wagesEarnedOnDate(date) {
  return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

// 7. allWagesFor — PROVIDED in the lab
function allWagesFor() {
  const dates = this.timeInEvents.map(e => e.date);
  return dates.reduce((total, date) => {
    return total + wagesEarnedOnDate.call(this, date);
  }, 0);
}

// 8. Find employee by first name
function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(record => record.firstName === firstName);
}

// 9. Calculate payroll for all employees
function calculatePayroll(records) {
  return records.reduce((total, emp) => {
    return total + allWagesFor.call(emp);
  }, 0);
}
