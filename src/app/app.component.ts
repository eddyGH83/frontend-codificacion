import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

    layoutMode = 'slim';

    lightMenu = true;

    topbarColor = 'layout-topbar-deeporange';

    inlineUser = false;

    isRTL = false;

    inputStyle = 'outlined';

    ripple = true;

    constructor(private primengConfig: PrimeNGConfig) { }

    ngOnInit() {
        this.primengConfig.ripple = true;

        this.primengConfig.setTranslation({
            "startsWith": "Starts with",
            "contains": "Contains",
            "notContains": "Not contains",
            "endsWith": "Ends with",
            "equals": "Equals",
            "notEquals": "Not equals",
            "noFilter": "No Filter",
            "lt": "Less than",
            "lte": "Less than or equal to",
            "gt": "Greater than",
            "gte": "Greater than or equal to",
            "is": "Is",
            "isNot": "Is not",
            "before": "Before",
            "after": "After",
            "dateIs": "Date is",
            "dateIsNot": "Date is not",
            "dateBefore": "Date is before",
            "dateAfter": "Date is after",
            "clear": "Clear",
            "apply": "Apply",
            "matchAll": "Match All",
            "matchAny": "Match Any",
            "addRule": "Add Rule",
            "removeRule": "Remove Rule",
            "accept": "Si",
            "reject": "No",
            "choose": "Elegir",
            "upload": "Subir",
            "cancel": "Cancelar",
            "dayNames": ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"],
            "dayNamesShort": ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
            "dayNamesMin": ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
            "monthNames": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
            "monthNamesShort": ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
            "dateFormat": "mm/dd/yy",
            "firstDayOfWeek": 0,
            "today": "Today",
            "weekHeader": "Wk",
            "weak": "Weak",
            "medium": "Medium",
            "strong": "Strong",
            "passwordPrompt": "Ingrese su contraseña",
            "emptyMessage": "No se han encontrado resultados",
            "emptyFilterMessage": "No se han encontrado resultados"
            //translations
        });

    }


}



/* 
constructor(private config: PrimeNGConfig) {}

    ngOnInit() {
        this.config.setTranslation({
            accept: 'Accept',
            reject: 'Cancel',
            //translations
        });
    }
*/