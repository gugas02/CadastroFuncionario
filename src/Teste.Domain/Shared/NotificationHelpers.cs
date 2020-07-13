using Flunt.Notifications;
using System;
using System.Collections.Generic;
using System.Text;

namespace Teste.Domain.Shared
{
    public static class NotificationHelpers
    {
        public static List<Notification> BuildNotifications(params Notification[] notification)
        {
            var listNotification = new List<Notification>();
            foreach (var item in notification)
            {
                listNotification.Add(item);
            }
            return listNotification;
        }
    }
}
