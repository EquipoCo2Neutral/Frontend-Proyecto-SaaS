import { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import { UsersInviteForm } from "@/types/index";

import InviteTenatView from "./InviteTenantView";
export default function InviteTenantModal() {
  const initialValues: UsersInviteForm = {
    nombre: "",
    inquilinoId: "",
    correoUsuario: "",
    rolId: 0,
  };
  const {
    formState: { errors },
  } = useForm({ defaultValues: initialValues });
  const navigate = useNavigate();
  const location = useLocation();
  const queryparams = new URLSearchParams(location.search);

  const tenatTask = queryparams.get("inviteTenant");
  const show = tenatTask ? true : false;
  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => navigate(location.pathname, { replace: true })}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                  <DialogTitle as="h3" className="font-black text-4xl  my-5">
                    Invitar Administrador
                  </DialogTitle>

                  <p className="text-xl font-bold">
                    Llena el formulario e invita {""}
                    <span className="text-orange-600">al Administrador</span>
                  </p>
                  <InviteTenatView />
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
