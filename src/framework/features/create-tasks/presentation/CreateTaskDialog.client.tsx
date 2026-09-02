'use client'

import CloseIcon from '@mui/icons-material/Close'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Fade from '@mui/material/Fade'
import IconButton from '@mui/material/IconButton'
import Slide from '@mui/material/Slide'
import Stack from '@mui/material/Stack'
import { type TransitionProps } from '@mui/material/transitions'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTranslations } from 'next-intl'
import { forwardRef, type ReactElement, type Ref } from 'react'

import { CreateTaskForm } from '@/framework/features/create-tasks/presentation/CreateTaskForm.client'

interface CreateTaskDialogProps {
  open: boolean
  onClose: () => void
}

const SlideUpTransition = forwardRef(function SlideUpTransition(
  props: TransitionProps & { children: ReactElement<unknown> },
  ref: Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />
})

export function CreateTaskDialog({ open, onClose }: CreateTaskDialogProps) {
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('lg'))
  const t = useTranslations('tasks.create')
  const tCommon = useTranslations()

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='sm'
      fullWidth={isDesktop}
      slots={{ transition: isDesktop ? Fade : SlideUpTransition }}
      slotProps={{
        paper: {
          sx: {
            borderRadius: isDesktop ? 2 : '16px 16px 0 0',
            m: isDesktop ? undefined : 0,
            maxWidth: isDesktop ? undefined : 'none',
            width: isDesktop ? undefined : '100%',
            maxHeight: isDesktop ? '90vh' : '90dvh',
          },
        },
      }}
      sx={isDesktop ? undefined : { '& .MuiDialog-container': { alignItems: 'flex-end' } }}
    >
      <Stack direction='row' sx={{ alignItems: 'center', justifyContent: 'space-between', px: 3, pt: 2 }}>
        <DialogTitle sx={{ p: 0, fontWeight: 600 }}>{t('title')}</DialogTitle>
        <IconButton aria-label={tCommon('common.close')} onClick={onClose} size='small'>
          <CloseIcon />
        </IconButton>
      </Stack>
      <DialogContent sx={{ pt: 2 }}>
        <CreateTaskForm onCreated={onClose} />
      </DialogContent>
    </Dialog>
  )
}
