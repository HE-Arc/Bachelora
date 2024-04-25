import { Notify } from 'quasar'


export default class Notification {
    static noTimeout = 0;
    static waringTimeout = 5000;

    static SERVER_FAILED = "Une erreur s'est produite au niveau du serveur. Veuillez réessayer.";
    static CONTACT_ADMIN = "Si le problème persistance, veuillez<a class='message-alert' href='mailto:stephane.oguey@he-arc.ch, loic.santschi@he-arc.ch, miranda.fleury@he-arc.ch?subject=Bachelora - Erreur'>contacter les administrateurs</a>.";

    static showNotification = (message, type, timeout) => {
        if (timeout === 0)
        {
            Notify.create({
                message: message,
                type: type,
                timeout: timeout
            });
        }
        else
        {
            Notify.create({
                message: message,
                type: type
            });
        }

    }

    static success = (message) => {
        this.showNotification(message, 'positive');
    }

    static failed = (message) => {
        this.showNotification("<strong class='message-alert-title'>" + message + "</strong>"
            + this.SERVER_FAILED + "<br>"
            + this.CONTACT_ADMIN,'negative', this.noTimeout);
    }

    static warning = (message) => {
        this.showNotification(message, 'warning', this.waringTimeout);
    }

    static information = (message) => {
        this.showNotification('info', message, this.noTimeout);
    }
}
