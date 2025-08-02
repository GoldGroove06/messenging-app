import React from 'react'
import Heading from '@radui/ui/Heading'
import Dialog from '@radui/ui/Dialog'

const OnlineUsers = [
    {
        id: 1,
        name: "User 1"
    },
    {
        id: 2,
        name: "User 2"
    },
    {
        id: 3,
        name: "User 3"
    }   
]
export default function HomeComp() {
    const [isFriendsOpen, setFriendsOpen] = React.useState(false)
    return (
        <div>
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
            {OnlineUsers.map((user) => (
                <div key={user.id}>{user.name}</div>
            ))}
        </div>
    )
}