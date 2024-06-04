using ChapAppAPI.Entities;
using Microsoft.AspNetCore.SignalR;
using System.Data.Common;

namespace ChapAppAPI.Services
{
    public class ChatHub : Hub
    {
        private readonly IDictionary<string, UserRoomConnection> _connection;

        public ChatHub(
            IDictionary<string, UserRoomConnection> connection
            )
        {
            _connection = connection;
        }

        public async Task SendMessage(string message)
        {
            if (_connection.TryGetValue(Context.ConnectionId, out UserRoomConnection userRoomConnection))
            {
                await Clients.Group(userRoomConnection.Room!)
                    .SendAsync("ReceiveMessage", userRoomConnection.User, message, DateTime.Now);
            }
        }

        public async Task JoinRoom(UserRoomConnection userRoomConnection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, userRoomConnection.Room!);

            _connection[Context.ConnectionId] = userRoomConnection;

            await Clients.Group(userRoomConnection.Room!).SendAsync("ReceiveMessage", "Chào mừng ", $"{userRoomConnection.User} đến với phòng chat");

            await SendConnectionUser(userRoomConnection.Room!);
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            if (!_connection.TryGetValue(Context.ConnectionId, out UserRoomConnection userRoomConnection))
            {
                return base.OnDisconnectedAsync(exception);
            }

            Clients.Group(userRoomConnection.Room!).SendAsync("ReceiveMessage", "Tạm biệt", $"{userRoomConnection.User} đã rời phòng chat");

            SendConnectionUser(userRoomConnection.Room!);

            return base.OnDisconnectedAsync(exception);
        }

        public Task SendConnectionUser(string room)
        {
            var users = _connection.Values.Where(x => x.Room == room).Select(x => x.User);

            return Clients.Group(room).SendAsync("ConnectedUser", users);
        }
    }
}
