/* eslint-disable @next/next/no-img-element */
import { IconGoogle } from '@/components/svg';
import { Loading, message } from '@/components/ui';
import { loginWithEmailPassword, singInWithGoogle } from '@/firebase';
import { validateEmail } from '@/helpers';
import { useAppDispatch, useForm, useGetStore } from '@/hooks';
import { finishLoading, login, startLoading } from '@/redux/slices';
import { Button, Input, Spacer } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

export const LoginPage = () => {

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { ui, auth } = useGetStore();
  
  const [touch, setTouch] = useState({
    password: false,
    validateEmail: false
  });

  const { password, email, onChange } = useForm({
    email : '',
    password : ''
  });

  const onLoginWithGoogle = async () =>{
    dispatch(startLoading());

    const { ok, displayName,errorMessage, email, photoURL, uid } = await singInWithGoogle();

    if(ok){

      dispatch(login({
        displayName:(displayName as string), 
        email: (email as string),
        photoURL:(photoURL as string), 
        uid: (uid as string), 
        status:'authenticated', 
      }));
      dispatch(finishLoading());
      router.push('/home');

      return;
    } 

    message({message:`Error al ingresar, ${errorMessage}` , type:'error'});
    dispatch(finishLoading());

  };

  const onLoginWithUserAndPassword = async () =>{
    dispatch(startLoading());
    const { ok, displayName, errorMessage, photoURL, uid } = await loginWithEmailPassword({email, password});

    if(ok){
      dispatch(login({
        displayName:(displayName as string), 
        email: (email as string),
        photoURL:(photoURL as string), 
        uid: (uid as string), 
        status:'authenticated', 
      }));

      dispatch(finishLoading());

      router.push('/home'); 

      return;
    }

    dispatch(finishLoading());

    message({message:`Error al ingresar, ${errorMessage}` , type:'error'});
  };

  useEffect(()=>{
    if(auth.status === 'authenticated'){
      router.push('/home'); 
    }
  },[auth.status, router]);

  return (
    <>
      <Loading isLoading={ui.isLoading} />

      <div
        style={{display:'grid', gridTemplateColumns:'40% 60%'}}
        className='h-screen overflow-hidden bg-primary-gray'
      >
      
        <div className='relative bgLogin'>
          <img src={'/images/Ellipse_left.png'} alt='images/Ellipse_left.png' className='h-screen w-full' />
          <img src={'/images/starLogin.png'} alt='starLogin' className='absolute left-0  w-3/4 ' id='starLogin' />
          <img src={'/images/endLogin.png'} alt='endLogin' className='absolute left-0  w-3/4 hidden' id='endLogin' />
        </div>

        <div style={{margin:'10vh auto 20vh 100px', maxWidth:'90%', minWidth:'70%'}}>
          <h1 className='text-primary-darkBlue m-0 ml-2'>Bienvenido</h1>
          <h5 className='text-primary-darkBlue ml-3 font-medium'>Inicia sesión para continuar tu progreso</h5>

          <div className='mt-16 ml-3'>
            <Input 
              name='email'
              onChange={onChange}
              onInput={(e:any)=>{
                const validate = validateEmail(e.target.value);
                validate 
                  ? setTouch(state=>({...state, validateEmail: true}))
                  : setTouch(state=>({...state, validateEmail: false}));
              }}
              fullWidth
              type='email'
              size='xl' 
              clearable 
              label="Correo electrónico" 
              placeholder='jhancarlos.ortegon@gmail.com' 
              color={!touch.validateEmail && email ? 'error' : 'default'}
              status={!touch.validateEmail && email ? 'error' : 'default'}
              helperColor={!touch.validateEmail && email ? 'error' : 'default'}
              helperText={!touch.validateEmail && email  ? 'Ingrese un correo valido' : ''} 
            />
          
            <Spacer y={1.5} />
            <Input.Password
              onChange={onChange}
              name='password'
              size='xl'
              fullWidth 
              clearable 
              label="Contraseña" 
              placeholder='***' 
              onInput={()=>setTouch(state=>({...state, password: true}))}
              color={password.length <= 5 && touch.password ? 'error' : 'default'}
              status={password.length <= 5 && touch.password ? 'error' : 'default'}
              helperColor={password.length <= 5 && touch.password ? 'error' : 'default'}
              helperText={password.length <= 5 && touch.password ? 'Ingrese mínimo 6 caracteres' : ''}
            />
            <Spacer y={1} />
            <span className='flex justify-end gap-2'>
              <span >no tienes una cuenta?</span>
              <span 
                className='font-bold cursor-pointer' 
                style={{color:'inherit'}} 
                onClick={()=>router.push('/auth/register')} 
              >
                Regístrate aquí
              </span>
            </span>

            <Spacer y={2} />
            <Button 
              size={'xl'} 
              css={{width:'100%'}} 
              className={password.length > 5 && touch.validateEmail ? 'bg-primary-darkBlue' : ''}
              disabled={!password.length || !touch.validateEmail}
              onPress={onLoginWithUserAndPassword} 
            >
              Ingresar
            </Button>
            <Spacer y={1} />
            <Button 
              icon={<IconGoogle/>} 
              auto 
              size={'xl'} 
              css={{width:'100%'}} 
              color={'error'} 
              onPress={onLoginWithGoogle} 
            >
              oogle
            </Button>

          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default LoginPage;