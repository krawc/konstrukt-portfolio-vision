
import { useState, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface InteractiveMarqueeProps {
  content: string[];
}

const InteractiveMarquee = ({ content }: InteractiveMarqueeProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isInputMode, setIsInputMode] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    setIsInputMode(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isSubmitting) return;

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.functions.invoke('send-portfolio-email', {
        body: { userResponse: inputValue }
      });

      if (error) {
        console.error('Error sending email:', error);
        alert('Failed to send message. Please try again.');
      } else {
        alert('Thanks for your response! Message sent successfully.');
        setInputValue("");
        setIsInputMode(false);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsInputMode(false);
      setInputValue("");
    }
  };

  const handleBlur = () => {
    // Don't close input mode on blur to allow interaction with the submit button
  };

  useEffect(() => {
    if (isInputMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInputMode]);

  if (isInputMode) {
    return (
      <form onSubmit={handleSubmit} className="relative inline-block">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className="bg-transparent border-b-[8px] sm:border-b-[12px] border-black text-black text-6xl md:text-8xl font-mono font-bold leading-tight outline-none min-w-[300px] max-w-[600px]"
          placeholder="multimodal"
          disabled={isSubmitting}
        />
        {inputValue.trim() && (
          <button
            type="submit"
            disabled={isSubmitting}
            className="ml-4 px-4 py-2 bg-black text-white font-mono text-sm hover:bg-gray-800 transition-colors rounded-lg disabled:opacity-50"
          >
            {isSubmitting ? 'Sending...' : 'Press ↵ to send'}
          </button>
        )}
      </form>
    );
  }

  return (
    <span 
      className="relative inline-block cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <span className={`transition-opacity duration-300 border-b-[8px] sm:border-b-[12px] border-black text-transparent`}>
        _____
      </span>
      
      <span className="absolute inset-0 overflow-hidden whitespace-nowrap">
        <span className="inline-block animate-[marquee_120s_linear_infinite]">
          {content.join(" • ")} • {content.join(" • ")} • 
        </span>
      </span>

      {/* Interactive cursor indicator */}
      <span className="absolute -top-1 -right-1 w-2 h-2 bg-black rounded-full animate-pulse"></span>
    </span>
  );
};

export default InteractiveMarquee;
