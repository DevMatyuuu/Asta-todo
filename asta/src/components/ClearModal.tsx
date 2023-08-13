import { FormEvent, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useModalStore} from '../store/ModalStore'
import { useBoardStore } from '../store/BoardStore';
import { Button } from '@material-tailwind/react';
import { useDarkModeStore } from '../store/DarkModeStore';



function ClearModal() {
  const [isClearModalOpen, clearModalClose, modalCategoryTitle] = useModalStore((state) => [state.isClearModalOpen, state.clearModalClose, state.modalCategoryTitle, state.setModalCategoryTitle]);
  const [clearAllTask] = useBoardStore((state) => [state.clearAllTask]);
  const isDark = useDarkModeStore((state) => state.isDark)

  let title = '';
  if (modalCategoryTitle === 'To-do' ) {
    title = 'To-do';
  } else if (modalCategoryTitle === 'In-progress') {
    title = 'In-progress'
  } else if (modalCategoryTitle === 'Done') {
    title = 'Done'
  }


  const handleClearTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearAllTask(modalCategoryTitle);
    clearModalClose(); 
  };  
  return (
    <Transition appear show={isClearModalOpen} as={Fragment}>
      <Dialog as='form' onSubmit={handleClearTask} onClose={clearModalClose} className='flex absolute top-60 m-auto left-0 right-0'>
        <div className="fixed inset-0 bg-black/30 bg-opacity-25" />
          <Dialog.Panel className={`${isDark ? 'bg-[#1F2022]' : 'bg-slate-300'} transition-all mx-auto max-w-md transform overflow-hidden p-6 rounded-2xl shadow-xl align-middle md:w-full w-96`}>
            <Dialog.Title className={`${isDark ? 'text-white' : 'text-black'} text-center md:mb-7 mb-3 text-[18px]`}>Are you sure you want to clear all {title} tasks? </Dialog.Title>
            <div>
            </div>
            <div className='flex gap-5 float-right'>
                <Button onClick={clearModalClose} className='bg-slate-700/40 hover:bg-slate-400  px-4'>
                    <p>Cancel</p>
                </Button>
                <Button type='submit' className='bg-slate-700/40 hover:bg-slate-400  px-4'>
                    <p>Confirm</p>
                </Button>
            </div>
          </Dialog.Panel>
      </Dialog>
    </Transition>
  )
}
export default ClearModal