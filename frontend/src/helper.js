import { PERMISSIONS } from "./Config"
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";

export const user_guards = () => {
    //let temp=[]
    let guards = sessionStorage.getItem('guards').split(',')
    return guards
}

export const has_guard = (group) => {
    let groups = user_guards()
    if (groups.includes(group)) {
        return true
    }
    return false
}
export const has_permission=(permission)=>{
    if(sessionStorage.getItem(PERMISSIONS)!=null){
        let permissions = sessionStorage.getItem(PERMISSIONS).split(',')
        return permissions.includes(permission)
    }
    return false
}
export function arrayRemoveItem(arr, value) {
    return arr.filter(function (ele) {
        // console.log('ele',ele,'value',value)
        return ele != value;
    });
}

export const getBuildDate = (epoch) => {
    const buildDate = moment(epoch).format("DD-MM-YYY HH:MM");
    return buildDate;
};
export function capitalize(string) {
    if (string != undefined) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    return ''
}

export function capitalizeFirstLetter(string="") {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function unique_elements(array){
    return array.filter((v, i, a) => a.indexOf(v) == i);
}

export const setErrors=(errors)=>{
    let field_errors={}
    for(const error in errors){
        field_errors[error]=errors[error]
    }
    return field_errors
}