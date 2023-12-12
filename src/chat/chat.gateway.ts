import { OnModuleInit } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway()
export class ChatGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  onModuleInit() {
    this.server.on('connection', (socket: Socket) => {
      // Al conectar un cliente

      const {
        token,
        name,
        //email = 'maxi@google.com',
      } = socket.handshake.auth;

      if (!name) {
        // verificaciones para rechazar connection
        socket.disconnect();
        return;
      }
      console.log('Cliente conectado', name, token, socket.id);
      socket.emit('welcome-message', 'Bienvenido a nuestro chat');

      this.chatService.onClientConnected({ id: socket.id, name: name });
      this.server.emit('on-clients-changed', this.chatService.getClients());
      socket.join('private-room'); // Unirse a la sala privada

      socket.on('disconnect', () => {
        this.chatService.onClientDisconnected(socket.id);
        this.server.emit('on-clients-changed', this.chatService.getClients());
      });
    });
  }

  @SubscribeMessage('send-message')
  handleMessage(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ) {
    if (!message) return;
    const { name } = client.handshake.auth;
    this.server.emit('on-message', {
      userId: client.id,
      message: message,
      name: name,
    });
  }

  @SubscribeMessage('send-private-message')
  handlePrivateMessage(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ) {
    if (!message) return;
    const { name } = client.handshake.auth;

    this.server.to('private-room').emit('on-private-message', {
      userId: client.id,
      message: 'este es un mensaje privado',
    });

    this.server.to('private-room').emit('on-private-message', {
      userId: client.id,
      message: message,
      name: name,
    });
  }
}
