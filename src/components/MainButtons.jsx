'use client';

import {
  FolderDown,
  Pause,
  Play,
  SendHorizontal,
} from 'lucide-react';
import { MultiStepLoader as Loader } from '@/components/ui/MultiStepLoader';
import { IconSquareRoundedX } from '@tabler/icons-react';
import { useEffect, useRef, useState, useCallback } from 'react';
import {
  Modal,
  ModalTrigger,
  ModalBody,
} from '@/components/ui/MainButtonTrigger';
import { BACKEND_URL } from './ui/Login';
import Cookies from "js-cookie";
import axios from 'axios';
import SettingsModal from './ui/SettingsModal';
import { useRouter } from 'next/navigation';

const MainButtons = ({ scriptName }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [btnStatus, setStatus] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [scriptStatus, setScriptStatus] = useState('Not Started');
  const [estimatedTime, setEstimatedTime] = useState(null);
  const timeoutRef = useRef(null);

  const loadingStates = [
    { text: 'Server is Up' },
    { text: 'Mining is Started' },
    { text: 'Data Collection Started' },
    { text: 'Data Approving' },
    { text: '93% is Approved' },
  ];

  // Fetch user data
  const fetchUserData = useCallback(async () => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(`${BACKEND_URL}/users/me/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      return null;
    }
  }, []);

  // Get current status
  const getCurrentStatus = useCallback(async () => {
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
  }, [scriptName]);

  // Timer for estimated time
  useEffect(() => {
    let timerInterval;
    if (btnStatus && estimatedTime) {
      timerInterval = setInterval(() => {
        setEstimatedTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerInterval);
            return 0;
          }
          return prevTime - 1;
        });
      }, 60000);
    }
    return () => clearInterval(timerInterval);
  }, [btnStatus, estimatedTime]);

  // Handle start button logic
  async function handleStart() {
    try {
      await axios.get(`${BACKEND_URL}/scraper/${scriptName}/start`, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      setStatus(true);

      const estimatedTimes = {
        yellowpages: 180,
        procurement: 10,
        grants_gov: 1,
        article_factory: 1,
      };
      setEstimatedTime(estimatedTimes[scriptName] || 90);
      localStorage.setItem(scriptName, true);

      const userData = await fetchUserData();
      if (!userData) return;

      await axios.put(
        `${BACKEND_URL}/checkedby/start`,
        null,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          params: {
            field: scriptName,
            username: userData.name,
          },
        }
      );
    } catch (error) {
      console.error('Error in handleStart:', error);
    }
  }

  // Export scraper data
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

        return fetch(`${BACKEND_URL}/download/start?field=${scriptName}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
      })
      .catch((error) => console.error('Error exporting scraper data:', error));
  }

  const handleClick = () => {
    router.push(`/dashboard/transfer/${scriptName}`);
  };

  const formatTime = (minutes) => {
    if (!minutes) return '';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours ? `${hours} h` : ''} ${mins ? `${mins} min` : ''}`.trim();
  };

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

      <div className='flex space-x-8'>
        <div>
          <p className='font-semibold text-sm'>Status:</p>
          <div className='flex md:py-2'>
            <p className='capitalize'>{scriptStatus}</p>
            <div
              className={`${
                btnStatus === false ? 'bg-emerald-500' : 'bg-red-500'
              } w-5 h-5 rounded-full flex items-center justify-center ml-2 mt-1`}
            >
              <p
                className={`${
                  btnStatus === false ? 'bg-emerald-500' : 'bg-red-500'
                } w-5 h-5 rounded-full animate-ping`}
              ></p>
            </div>
          </div>
          {btnStatus && estimatedTime > 0 && (
            <p className="text-sm font-medium">
              Estimated Time: {formatTime(estimatedTime)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainButtons;
