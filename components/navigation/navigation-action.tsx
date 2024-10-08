"use client"
import { Plus } from 'lucide-react'
import React from 'react'
import { ActionTooltip } from '../action-tooltip'
import { useModal } from '@/hooks/use-modal-store'

const Navigationaction = () => {
  const { onOpen } = useModal();
  return (
    <div>
      <ActionTooltip side='right' align='center' label='Add a Server'>
        <button onClick={() => onOpen("createServer")} className='group flex items-center'>
          <div className="flex mx-3 h-[44px] w-[44px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center
            bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
            <Plus className='group-hover:text-white transition text-emerald-500' size={25} />
          </div>
        </button>
      </ActionTooltip>
    </div>
  )
}

export default Navigationaction