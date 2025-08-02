import React from 'react'
import Heading from '@radui/ui/Heading'
import Dialog from '@radui/ui/Dialog'
import Avatar from '@radui/ui/Avatar'
import Button from '@radui/ui/Button'

const OnlineUsers = [
    {
        id: 1,
        name: "User 1",
        src: "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"

    },
    {
        id: 2,
        name: "User 2",
        src: "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
    },
    {
        id: 3,
        name: "User 3",
        src: "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
    }
]

const VerticalDots = () => (<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.625 2.5C8.625 3.12132 8.12132 3.625 7.5 3.625C6.87868 3.625 6.375 3.12132 6.375 2.5C6.375 1.87868 6.87868 1.375 7.5 1.375C8.12132 1.375 8.625 1.87868 8.625 2.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM7.5 13.625C8.12132 13.625 8.625 13.1213 8.625 12.5C8.625 11.8787 8.12132 11.375 7.5 11.375C6.87868 11.375 6.375 11.8787 6.375 12.5C6.375 13.1213 6.87868 13.625 7.5 13.625Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>)
const ChatIcon = () => (<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 3L2.5 3.00002C1.67157 3.00002 1 3.6716 1 4.50002V9.50003C1 10.3285 1.67157 11 2.5 11H7.50003C7.63264 11 7.75982 11.0527 7.85358 11.1465L10 13.2929V11.5C10 11.2239 10.2239 11 10.5 11H12.5C13.3284 11 14 10.3285 14 9.50003V4.5C14 3.67157 13.3284 3 12.5 3ZM2.49999 2.00002L12.5 2C13.8807 2 15 3.11929 15 4.5V9.50003C15 10.8807 13.8807 12 12.5 12H11V14.5C11 14.7022 10.8782 14.8845 10.6913 14.9619C10.5045 15.0393 10.2894 14.9965 10.1464 14.8536L7.29292 12H2.5C1.11929 12 0 10.8807 0 9.50003V4.50002C0 3.11931 1.11928 2.00003 2.49999 2.00002Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>)
const DotIcon = () => (<svg width="30" height="30" viewBox="0 0 15 15" className="text-teal-500" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.875 7.5C9.875 8.81168 8.81168 9.875 7.5 9.875C6.18832 9.875 5.125 8.81168 5.125 7.5C5.125 6.18832 6.18832 5.125 7.5 5.125C8.81168 5.125 9.875 6.18832 9.875 7.5Z" fill="currentColor"></path></svg>)
export default function HomeComp() {
    const [isFriendsOpen, setFriendsOpen] = React.useState(false)
    return (
        <div className="flex flex-col space-y-4 p-4 w-full">
            <Heading as="h3">Friends Online</Heading>

            <Dialog.Root open={isFriendsOpen} onOpenChange={setFriendsOpen}>
                <Dialog.Trigger >
                    Add friend

                </Dialog.Trigger>
                <Dialog.Trigger>
                    view friends
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay />
                    <Dialog.Content>
                        <Dialog.Title>
                            Are you sure you want to delete this account?
                        </Dialog.Title>
                        <Dialog.Description>
                            This action cannot be undone.
                        </Dialog.Description>

                        <Dialog.Close>
                            close
                        </Dialog.Close>
                    </Dialog.Content>

                </Dialog.Portal>

            </Dialog.Root>
            <div className="flex flex-col space-y-4 p-4 w-full">
                {OnlineUsers.map((user) => (
                    <div key={user.id} className="flex items-center space-x-4 ">
                        <div className="relative w-10 ">
                        <Avatar.Root className="!w-10 ">
                            <Avatar.Image src={user.src} />
                            
                        </Avatar.Root>
                        <div className="absolute bottom-0 right-0 bg-teal-500 w-3 h-3 rounded-full border border-gray-300">
                       
                        </div>
                        </div>

                        <div className="flex justify-between space-x-4 w-full items-center">
                            {user.name}
                            <div>
                                <Button><ChatIcon /></Button>
                                <Button><VerticalDots /></Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}