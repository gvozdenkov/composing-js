const messageList = [
  {
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    image:
      'https://images.unsplash.com/photo-1624561172888-ac93c696e10c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    isOwner: false,
  },
  {
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur quisquam eaque possimus magnam libero doloremque, eum sequi veniam? Debitis rerum explicabo laboriosam voluptatum error illo reiciendis neque molestias cumque sapiente!',
    image:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    isOwner: true,
  },
  {
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur quisquam eaque possimus magnam libero doloremque, eum sequi veniam?',
    image:
      'https://images.unsplash.com/photo-1572816703269-bccda14a887b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTYyfHxhdmF0YXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    isOwner: false,
  },
];

const messageContainer = document.querySelector('.massage-list');
const messageTemplateDefaultSelector = '.message-template_type_default';
const messageTemplateUserSelector = '.message-template_type_user';

const getElement = () => ({
  getElement: (state) => {
    return document.querySelector(state.selector).content.children[0].cloneNode(true);
  },
});

function UserMessage({ text }, selector) {
  let messageProto = Object.create(getElement());
  let state = {
    text,
    selector,
  };

  return Object.assign(
    {},
    {
      generate: () => {
        const messageElement = messageProto.getElement(state);
        messageElement.classList.add('message_type_user');
        messageElement.querySelector('.message__paragraph').textContent = text;

        return messageElement;
      },
    }
  );
}

function DefaultMessage({ text, image }, selector) {
  let messageProto = Object.create(getElement());
  let state = {
    text,
    image,
    selector,
  };

  return Object.assign(
    {},
    {
      generate: () => {
        const messageElement = messageProto.getElement(state);
        messageElement.querySelector('.message__avatar').src = image;
        messageElement.querySelector('.message__paragraph').textContent = text;

        return messageElement;
      },
    }
  );
}

messageList.forEach((message) => {
  const newMessage = message.isOwner
    ? UserMessage(message, messageTemplateUserSelector)
    : DefaultMessage(message, messageTemplateDefaultSelector);

  messageContainer.append(newMessage.generate());
});
