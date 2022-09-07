const assert = require('assert');
const displayPlan = require('../price_plan');

const pgp = require('pg-promise')()

const DATABASE_URL = process.env.DATABASE_URL || "postgresql://postgres:pg1999@localhost:5432/test";

const config = {
  connectionString: DATABASE_URL,
 /* ssl: {
    rejectUnauthorized: false,
  },*/
};

const db = pgp(config);

describe('Greetings function', function(){

    beforeEach(async function(){
    await db.none("delete from users")
    });

it("should return error message when I do not insert name and select the price plan", async function(){
    let regs = displayPlan(db);

    await regs.AllocatingPeople('', '')

    assert.equal('please enter user and price plan', await regs.returnError());

});
it("should return error message when I do not insert name but i select the price plan", async function(){
    let regs = displayPlan(db);

    await regs.AllocatingPeople('', 'sms100')

    assert.equal('please enter user', await regs.returnError());

});

it("should return error message when I insert name but i do not select the price plan", async function(){
    let regs = displayPlan(db);

    await regs.AllocatingPeople('WISEMAN', '')

    assert.equal('please enter price plan', await regs.returnError());

});

})