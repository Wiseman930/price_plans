module.exports = function pricePlanning(db){
    let dataPlanNames;
    let error;
    let usageTotal;


    async function resetAll(){
        let deleteData = await db.oneOrNone("delete from users");
    }
    async function AllocatingPeople(Names, plan){
        giveMeName = Names.toUpperCase();

        let storedFKey = await db.oneOrNone('SELECT id FROM pricing_plans WHERE plan_name=$1', [plan])

        checkName = await db.oneOrNone('SELECT user_names FROM users WHERE user_names =$1', [giveMeName])
        if(checkName == null && giveMeName != '' && plan != ''){

            await db.none('INSERT INTO users(user_names, link_id) values($1, $2)', [giveMeName, storedFKey.id])
        }
        if(plan =='' && giveMeName == ''){

            error = "please enter user and price plan"
        }
        else if(plan !='' && giveMeName == ''){

            error = "please enter user"
        }
        else if(plan =='' && giveMeName != ''){

            error = "please enter price plan"
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
    async function sumForUser(name, usageString){
        let uppCase = name.toUpperCase()
        let storedName = await db.oneOrNone('SELECT link_id FROM users WHERE user_names=$1', [uppCase])
        let sms;
        let call;
        let smsCost;
        let callCost
        if(storedName !== null){
         sms = await db.oneOrNone('SELECT sms_price FROM pricing_plans WHERE id=$1', [storedName.link_id])
         call = await db.oneOrNone('SELECT call_price FROM pricing_plans WHERE id=$1', [storedName.link_id])
         smsCost = sms.sms_price;
         callCost = call.call_price;
        }
        else if (storedName == null){
            totalUsage = 0
        }

        let usage = usageString.split(',');
        var totalUsage = 0;

        for(var i=0; i<usage.length; i++){
            var use = usage[i].toUpperCase();
            if (use == 'CALL'){
                totalUsage += callCost;
            }
            else if (use == 'SMS'){
                totalUsage += smsCost;
            }
        }

         usageTotal =  "R" + totalUsage.toFixed(2);


    }
    function returnError(){
        return error;
    }
    function returnSumForUser(){
        return usageTotal
    }

return {
    AllocatingPeople,
    resetAll,
    namesFromDatabase,
    returnError,
    sumForUser,
    returnSumForUser
}
}