import { Settings, MessageCircle, Swords } from 'lucide-react';
import './ProfileCard.css';

interface ProfileCardProps {
  name: string;
  age?: number;
  gender?: string;
  gym?: string;
  totalMatches?: number;
  experienceLevel?: string;
  weightClass?: string;
  bio?: string;
  sparringStyles?: string[];
  onEdit?: () => void;
  onChallenge?: () => void;
  onMessage?: () => void;
}

export const ProfileCard = ({
  name,
  age,
  gender,
  gym,
  totalMatches = 0,
  experienceLevel = 'N/A',
  weightClass = 'N/A',
  bio,
  sparringStyles = [],
  onEdit,
  onChallenge,
  onMessage,
}: ProfileCardProps) => {
  return (
    <div className="profile-card">
      <div className="profile-corner">
        <i data-corner="tl"></i>
        <i data-corner="br"></i>
        <div data-action="notif" className="profile-action" onClick={onEdit}>
          <Settings className="profile-action-icon" />
        </div>
      </div>

      <figure className="profile-boxes">
        <span className="profile-img">
          🥊
        </span>
        <figcaption className="profile-caption">
          <p className="profile-name">{name}</p>
          {age && gender && (
            <span className="profile-as" title={`${age} tahun • ${gender}`}>
              {age} tahun • {gender}
            </span>
          )}
          {gym && (
            <span className="profile-as" title={gym}>
              {gym}
            </span>
          )}
        </figcaption>
      </figure>

      <div className="profile-box-body">
        <div className="profile-stats-grid">
          <div className="profile-stat">
            <div className="profile-stat-value profile-stat-primary">
              {totalMatches}
            </div>
            <div className="profile-stat-label">Matches</div>
          </div>
          <div className="profile-stat">
            <div className="profile-stat-value profile-stat-accent">
              {experienceLevel}
            </div>
            <div className="profile-stat-label">Level</div>
          </div>
          <div className="profile-stat">
            <div className="profile-stat-value profile-stat-secondary">
              {weightClass}
            </div>
            <div className="profile-stat-label">Class</div>
          </div>
        </div>

        {bio && (
          <div className="profile-bio">
            <p className="profile-bio-label">Bio</p>
            <p className="profile-bio-text">{bio}</p>
          </div>
        )}

        {sparringStyles.length > 0 && (
          <div className="profile-styles">
            <p className="profile-styles-label">Sparring Styles</p>
            <div className="profile-styles-tags">
              {sparringStyles.map((style) => (
                <span key={style} className="profile-tag">
                  {style}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div data-title="Quick Actions" className="profile-box-foot">
        <div className="profile-box-foot-actions">
          {onChallenge && (
            <button
              type="button"
              aria-label="challenge"
              className="profile-box-foot-action"
              onClick={onChallenge}
            >
              <Swords className="profile-foot-icon" />
            </button>
          )}
          {onMessage && (
            <button
              type="button"
              aria-label="message"
              className="profile-box-foot-action profile-action-primary"
              onClick={onMessage}
            >
              <MessageCircle className="profile-foot-icon" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
