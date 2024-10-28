'use client';
import {
  FolderDown,
  Pause,
  Play,
  SendHorizontal,
} from 'lucide-react';
import { MultiStepLoader as Loader } from '@/components/ui/MultiStepLoader';
import { IconSquareRoundedX } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import {
  Modal,
  ModalTrigger,
  ModalBody,
} from '@/components/ui/MainButtonTrigger';
import { BACKEND_URL } from './ui/Login';
import axios from 'axios';
import SettingsModal from './ui/SettingsModal';
import { useRouter } from 'next/navigation';

const MainButtons = ({ scriptName }) => {
  const loadingStates = [
    { text: 'Server is Up' },
    { text: 'Mining is Started' },
    { text: 'Data Collection Started' },
    { text: 'Data Approving' },
    { text: '93% is Approved' },
  ];

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [btnStatus, setStatus] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const timeoutRef = useRef(null);
  const [scriptStatus, setScriptStatus] = useState('Not Started');

  function ChangeButtonStatus() {
    fetch(`${BACKEND_URL}/scraper/${scriptName}/start`)
      .then((response) => response.json())
      .catch((error) => console.error("Error starting script:", error));
    setStatus((prevStatus) => !prevStatus);
    if (!btnStatus) {
      setLoading(true);
      setIsModalOpen(true);
    } else {
      setLoading(false);
      setIsModalOpen(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem(scriptName);
      if (storedValue) setStatus(true);
    }
  }, [scriptName]);

  useEffect(() => {
    let intervalId;
    if (btnStatus === true) {
      getCurrentStatus();
      intervalId = setInterval(getCurrentStatus, 10000);
    } else if (intervalId) clearInterval(intervalId);

    return () => clearInterval(intervalId);
  }, [btnStatus]);

  async function getCurrentStatus() {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/scraper/${scriptName}/status`,
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
      const getStatus = response.data;
      setScriptStatus(getStatus.status);
      if (getStatus.status === 'completed') {
        setStatus(false);
        localStorage.removeItem(scriptName);
      }
    } catch (error) {
      console.error('Error fetching status:', error);
    }
  }

  async function handleStart() {
    await axios.get(
      `http://127.0.0.1:8000/scraper/${scriptName}/start`,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    setStatus(true);
    localStorage.setItem(scriptName, true);
  }

  function exportScraper() {
    fetch(`${BACKEND_URL}/scraper/${scriptName}/download`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'collection_data.csv';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => console.error('Error exporting scraper data:', error));
  }

  const handleClick = () => {
    router.push(`/dashboard/transfer/${scriptName}`);
  };

  function handleLoadingComplete() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setStatus(false);
      setIsModalOpen(false);
    }, 60000);
  }

  return (
    <div className='flex justify-between items-center py-2 md:py-6 md:px-6'>
      <div className='flex space-x-2'>
        <div className='flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4'>
          <div>
            <button
              onClick={handleStart}
              className='flex justify-center items-center space-x-2 px-1 py-1 sm:px-2 sm:py-2 rounded-md text-sm sm:text-lg bg-primaryColor text-white font-semibold tracking-wide transition duration-200 hover:bg-white hover:text-primaryColor border-2 border-transparent hover:border-primaryColor'
            >
              <div>{btnStatus === false ? <Play /> : <Pause />}</div>
              <div>{btnStatus === false ? 'Start' : 'Stop'}</div>
            </button>
          </div>
          <SettingsModal />
          <button
            onClick={handleClick}
            className='flex justify-center items-center space-x-2 px-1 py-1 sm:px-2 sm:py-2 rounded-md text-sm sm:text-lg bg-primaryColor text-white font-semibold tracking-wide transition duration-200 hover:bg-white hover:text-primaryColor border-2 border-transparent hover:border-primaryColor'
          >
            <SendHorizontal />
            <span>Send</span>
          </button>
          <button
            onClick={exportScraper}
            className='hidden md:flex justify-center items-center space-x-2 px-1 py-1 sm:px-2 sm:py-2 rounded-md text-sm sm:text-lg bg-primaryColor text-white font-semibold tracking-wide transition duration-200 hover:bg-white hover:text-primaryColor border-2 border-transparent hover:border-primaryColor'
          >
            <FolderDown />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className='flex justify-center items-center space-x-8'>
        <div>
          <p className='font-semibold text-sm'>Status:</p>
          <div className='flex items-center justify-center md:py-2'>
            <p className='capitalize'>{scriptStatus}</p>
            <div
              className={`${
                btnStatus === false ? 'bg-red-500' : 'bg-emerald-500'
              } w-5 h-5 rounded-full flex items-center justify-center ml-2 mt-1`}
            >
              <p
                className={`${
                  btnStatus === false ? 'bg-red-500' : 'bg-emerald-500'
                } w-5 h-5 rounded-full animate-ping`}
              ></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainButtons;
