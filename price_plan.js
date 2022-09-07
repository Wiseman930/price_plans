module.exports = function pricePlanning(db){
    let dataPlanNames;


    async function resetAll(){
        let deleteData = await db.oneOrNone("delete from users");
    }
    async function AllocatingPeople(Names, plan){
        giveMeName = Names.toUpperCase();

        let storedFKey = await db.oneOrNone('SELECT id FROM pricing_plans WHERE plan_name=$1', [plan])

        checkName = await db.oneOrNone('SELECT user_names FROM users WHERE user_names =$1', [giveMeName])
        if(checkName == null && giveMeName != ''){

            await db.none('INSERT INTO users(user_names, link_id) values($1, $2)', [giveMeName, storedFKey.id])
        }
    }
    async function namesFromDatabase(plan){
        if(plan == 'sms100'){
        dataPlanNames = await db.manyOrNone('SELECT user_names FROM users WHERE link_id=$1', [1])
        }
        else if(plan == 'sms200'){
         dataPlanNames = await db.manyOrNone('SELECT user_names FROM users WHERE link_id=$1', [2])
        }
        else if(plan == 'call weekly'){
            dataPlanNames = await db.manyOrNone('SELECT user_names FROM users WHERE link_id=$1', [3])

        }
        return dataPlanNames
    }
    async function sumForUser(name, plan){

    }

return {
    AllocatingPeople,
    resetAll,
    namesFromDatabase,
    sumForUser
}
}