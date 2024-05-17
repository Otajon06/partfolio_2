'use client'
import { useEffect, useState } from "react";
import { auth, db, getDocs, collection } from '../FireBaseConfig'
import { signOut } from "firebase/auth";
const ModalEandP = ({ isOpen, onClose }) => {
    const [user, setUser] = useState(null);
    const [address, setAddress] = useState([]);
    
    useEffect(() => {
        const getData = async () => {
            try {
              const q = collection(db, 'user_address');
              const dataBasa = await getDocs(q);
              const basaArr = dataBasa.docs.map(doc => doc.data());
              setAddress(basaArr);
          } catch (error) {
            console.log('xato');
          }
        }
        getData();
    },[])

    // console.log(address);

    useEffect(() => {
    
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, 15000);

            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;


    const handleSignOut = async () => { 
        try {
            await signOut(auth);
            window.location.href='/signin'
        } catch (error) {
            console.error('xato111');
        }
    };
    
    const fillter = address.filter(e=> e.email == user.email)
    console.log(fillter);
        return (
          <div className='back_modal_container' onClick={onClose}>
          <div className='modal_container' onClick={(e) => e.stopPropagation()}>
              <button onClick={onClose} className="modal_close">Close</button>
                        <div>
                        <img src='data:image/png;base64,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' alt="" />
                        <h1>{user.email}</h1>
                    </div>
                    {fillter.map(fillter => 
                  <>
                    <div>
                        <h1>Welcome! {fillter.name} {fillter.surName}</h1>
                        <h1>age: {fillter.age}y.o</h1>
                        <h1>Phone Number: {fillter.number}</h1>
                        <h1>Country: {fillter.city} in {fillter.country}</h1>
                    </div>

                  </>
                        )}
                        <button onClick={handleSignOut} className='modal_signOut'>Sign Out</button>
          </div>
      </div>
        );
    }

export default ModalEandP;