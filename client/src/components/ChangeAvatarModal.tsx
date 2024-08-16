import Overlay from '@/components/Overlay';
import { Camera } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRef, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { getFileExtension } from '@/lib/utils';
import { useChangeAvatar } from '@/hooks/useChangeAvatar';
import { useAuth } from '@/state/useAuth';
import { Loader } from 'lucide-react';

interface ChangeAvatarModalProps {
  closeModal: () => void;
}

const allowedFileExtensions: string[] = ['jpg', 'jpeg', 'png', 'webp'];

const ChangeAvatarModal: React.FC<ChangeAvatarModalProps> = ({ closeModal }) => {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const { toast } = useToast();
  const { mutate, isPending } = useChangeAvatar();
  const { setCredentials, clearCredentials } = useAuth();
  const avatarRef = useRef<HTMLInputElement | null>(null);
  9;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      const avatarFile: File = e.target.files[0];
      const fileExtension = getFileExtension(avatarFile);
      const isFileAllowed = allowedFileExtensions.find((ext) => ext === fileExtension);

      if (isFileAllowed) {
        const urlPreview = URL.createObjectURL(avatarFile);
        setAvatarFile(avatarFile);
        setAvatarPreview(urlPreview);
      } else {
        toast({
          title: 'Invalid file',
          description: "Only files of the type 'image' are allowed.",
        });
      }
    }
  };

  const handleChangeAvatar = () => {
    if (avatarFile) {
      mutate(avatarFile, {
        onSuccess: (data) => {
          setCredentials(data);
          toast({
            title: 'Success',
            description: 'Avatar successfully changed.',
          });
          closeModal();
        },
        onError: (error) => {
          if (error.response?.status === 401) {
            clearCredentials();
          } else {
            toast({
              title: 'Something went wrong!',
              description:
                error.response?.data.message ||
                'An error occurred while we tried to change your avatar.',
            });
          }
        },
      });
    }
  };

  return (
    <Overlay>
      <div className='flex-1 max-w-[380px]'>
        <Card>
          <CardHeader>
            <CardTitle>Edit Avatar</CardTitle>
            <CardDescription>Choose a file to change your avatar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col items-center gap-y-4'>
              <input hidden type='file' onChange={handleChange} ref={avatarRef} />
              {avatarFile ? (
                <img
                  src={avatarPreview}
                  alt={avatarFile.name}
                  className='w-[300px] aspect-square rounded-full object-cover object-center'
                />
              ) : (
                <div className='w-full aspect-square rounded-full border-2 border-primary'></div>
              )}

              <Button
                variant='outline'
                disabled={isPending}
                onClick={() => avatarRef.current?.click()}
                className='max-w-[300px] flex items-center gap-x-2 overflow-hidden text-ellipsis whitespace-nowrap'
              >
                {avatarFile ? (
                  avatarFile.name
                ) : (
                  <>
                    <Camera size={20} />
                    <span>Choose file</span>
                  </>
                )}
              </Button>
            </div>
          </CardContent>
          <CardFooter className='flex items-center justify-center gap-2 border-t pt-5'>
            <Button
              type='submit'
              disabled={avatarFile === null || isPending}
              onClick={handleChangeAvatar}
              className='flex-1 flex items-center justify-center gap-2'
            >
              {isPending && <Loader size={20} className='animate-spin' />}
              <span>{isPending ? 'Uploading...' : 'Upload'}</span>
            </Button>
            <Button type='button' variant='secondary' onClick={closeModal}>
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Overlay>
  );
};

export default ChangeAvatarModal;
