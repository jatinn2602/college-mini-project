import React from 'react';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { NewsItem } from '../data/news';

interface EventCardProps {
  item: NewsItem;
  onReadMore?: (item: NewsItem) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ item, onReadMore }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-subtle hover:shadow-card-hover transition-all duration-300 flex flex-col group hover:-translate-y-1">
      <div className="relative h-44 overflow-hidden bg-slate-100">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 bg-[#123B6D] text-white text-[10px] font-extrabold uppercase tracking-wider rounded-md shadow">
            {item.category}
          </span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center text-xs text-slate-500 font-medium space-x-3 mb-2">
            <div className="flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>{item.date}</span>
            </div>
            {item.location && (
              <div className="flex items-center space-x-1 truncate">
                <MapPin className="w-3.5 h-3.5 text-[#0F766E]" />
                <span className="truncate">{item.location}</span>
              </div>
            )}
          </div>

          <h4 className="text-base font-bold text-[#0F172A] group-hover:text-[#123B6D] transition-colors font-heading leading-snug line-clamp-2 mb-2">
            {item.title}
          </h4>

          <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
            {item.summary}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] font-semibold text-[#0F766E]">
            {item.badgeText || 'SRGI Event'}
          </span>
          <button
            onClick={() => onReadMore && onReadMore(item)}
            className="text-xs font-bold text-[#123B6D] hover:text-[#0F766E] flex items-center space-x-1 transition-colors cursor-pointer"
          >
            <span>Read More</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
