
Saranya K <sansaranya45@gmail.com>
11:38 AM (0 minutes ago)
to sansaranya50

# Stage 1

## Priority Inbox Approach
To determine the top 'n' most important unread notifications, we implement a scoring function based on custom weights and recency.

### Weight System Matrix:
- Placement = 3 Points
- Result = 2 Points
- Event = 1 Point

### Recency Sorting:
If two notifications have identical weights, the secondary sort key utilizes the chronological unix timestamp to push the newest entry first.

### Algorithm Implementation
```typescript
interface NotificationItem {
  ID: string;
  Type: 'Placement' | 'Result' | 'Event';
  Message: string;
  Timestamp: string;
}

const WEIGHTS: Record<string, number> = {
  "Placement": 3,
  "Result": 2,
  "Event": 1
};

function getTopPriorityNotifications(notifications: NotificationItem[], n: number = 10): NotificationItem[] {
  return [...notifications]
    .sort((a, b) => {
      const weightA = WEIGHTS[a.Type] || 0;
      const weightB = WEIGHTS[b.Type] || 0;
      
      if (weightB !== weightA) {
        return weightB - weightA;
      }
      
      return new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime();
    })
    .slice(0, n);
}