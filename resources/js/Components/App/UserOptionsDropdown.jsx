import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
} from "@headlessui/react";
import {
    EllipsisVerticalIcon,
    LockClosedIcon,
    LockOpenIcon,
    ShieldCheckIcon,
    UserIcon,
} from "@heroicons/react/24/solid";
//import axios from "axios";
import { Fragment } from "react";

const UserOptionsDropdown = ({ conversation }) => {
    const changeUserRole = () => {
        console.log("Change user role");
        if (!conversation.is_user) {
            return;
        }

        //send axios post request to change user role and show notification on success
        axios
            .post(route("user.changeRole", conversation.id))
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const onBlockUser = () => {
        console.log("Block User");
        if (!conversation.is_user) {
            return;
        }

        //send axios post request to change user role and show notification on success
        axios
            .post(route("user.blockUnblock", conversation.id))
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <>
            <div>
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <MenuButton className="flex justify-center items-center w-8 h-8 rounded-full hover:bg-black/40">
                            <EllipsisVerticalIcon className="h-5 w-5"></EllipsisVerticalIcon>
                        </MenuButton>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-inn duration-75"
                        leaveFrom="tranform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <MenuItems className="absolute  right-0 mt-2 w-48 rounded-md bg-gray-800 shadow-lg z-50">
                            <div className="px-1 py-1">
                                <MenuItem>
                                    {({ active }) => (
                                        <button
                                            onClick={onBlockUser}
                                            className={`${
                                                active
                                                    ? "bg-black/30 text-white"
                                                    : "text-gray-100"
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        >
                                            {conversation.blocked_at && (
                                                <>
                                                    <LockOpenIcon className="w-4 h-4 mr-2" />
                                                    Unblock User
                                                </>
                                            )}
                                            {!conversation.blocked_at && (
                                                <>
                                                    <LockClosedIcon className="w-4 h-4 mr-2" />
                                                    Block User
                                                </>
                                            )}
                                        </button>
                                    )}
                                </MenuItem>
                            </div>
                            <div className="px-1 py-1">
                                <MenuItem>
                                    {({ active }) => (
                                        <button
                                            onClick={changeUserRole}
                                            className={`${
                                                active
                                                    ? "bg-black/30 text-white"
                                                    : "text-gray-100"
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        >
                                            {conversation.is_admin && (
                                                <>
                                                    <UserIcon className="w-4 h-4 mr-2" />
                                                    Make Regular User
                                                </>
                                            )}
                                            {!conversation.is_admin && (
                                                <>
                                                    <ShieldCheckIcon className="w-4 h-4 mr-2" />
                                                    Make Admin
                                                </>
                                            )}
                                        </button>
                                    )}
                                </MenuItem>
                            </div>
                        </MenuItems>
                    </Transition>
                </Menu>
            </div>
        </>
    );
};

export default UserOptionsDropdown;
