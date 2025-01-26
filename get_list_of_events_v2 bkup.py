import asyncio
import aiohttp
import json

async def safe_request(session, url, max_retries=3, delay=1, timeout=30):
    retries = 0
    while retries < max_retries:
        try:
            async with session.get(url, timeout=timeout) as response:
                if response.status == 200:
                    return await response.json()
                else:
                    print(f"Request failed with status code {response.status}")
        except aiohttp.ClientError as e:
            print(f"Request failed: {e}")
        retries += 1
        await asyncio.sleep(delay)
    return None

async def fetch_event_details(session, base_url, client_code, item):
    event_item_data = {
        "EventItemId": item.get("EventItemId"),
        "EventItemTitle": item.get("EventItemTitle"),
        "EventItemAgendaNumber": item.get("EventItemAgendaNumber"),
        "EventItemAgendaSequence": item.get("EventItemAgendaSequence"),
        "EventItemMatterId": item.get("EventItemMatterId"),
        "Attachments": [],
        "Votes": [],
        "MatterHistory": []
    }

    # Extract attachment details
    attachments = item.get("EventItemMatterAttachments", [])
    print(f"Attachments for EventItemId {item.get('EventItemId')}: {attachments}")  # Debug statement
    for attachment in attachments:
        attachment_data = {
            "MatterAttachmentName": attachment.get("MatterAttachmentName"),
            "MatterAttachmentHyperlink": attachment.get("MatterAttachmentHyperlink"),
            "MatterAttachmentFileName": attachment.get("MatterAttachmentFileName")
        }
        event_item_data["Attachments"].append(attachment_data)

    # Fetch votes and history if EventItemMatterId is present and not null
    matter_id = item.get("EventItemMatterId")
    if matter_id:
        votes_url = f"{base_url}{client_code}/EventItems/{item.get('EventItemId')}/Votes"
        votes = await safe_request(session, votes_url)
        if votes:
            for vote in votes:
                event_item_data["Votes"].append({
                    "VotePersonName": vote.get("VotePersonName"),
                    "VoteValueName": vote.get("VoteValueName")
                })

        history_url = f"{base_url}{client_code}/Matters/{matter_id}/Histories"
        histories = await safe_request(session, history_url)
        if histories:
            for history in histories:
                event_item_data["MatterHistory"].append({
                    "MatterHistoryActionName": history.get("MatterHistoryActionName"),
                    "MatterHistoryActionText": history.get("MatterHistoryActionText"),
                    "MatterHistoryMoverName": history.get("MatterHistoryMoverName"),
                    "MatterHistoryPassedFlagName": history.get("MatterHistoryPassedFlagName"),
                    "MatterHistorySeconderName": history.get("MatterHistorySeconderName")
                })

    return event_item_data

async def fetch_event_items():
    base_url = "https://webapi.legistar.com/v1/"
    client_code = "HarrisCountyTx"
    url = f"{base_url}{client_code}/Events/1192/EventItems?AgendaNote=1&MinutesNote=1&Attachments=1"  # Ensure URL matches original script

    async with aiohttp.ClientSession() as session:
        event_items = await safe_request(session, url)
        if event_items:
            print(f"Total items fetched: {len(event_items)}")
            return event_items
        else:
            print("Failed to fetch initial event items.")
            return []

async def main():
    event_items = await fetch_event_items()
    if event_items:
        extracted_data = []
        async with aiohttp.ClientSession() as session:
            tasks = []
            for index, item in enumerate(event_items, start=1):
                if item.get("EventItemTitle") != "page break":
                    print(f"Processing item {index}...")
                    task = fetch_event_details(session, "https://webapi.legistar.com/v1/", "HarrisCountyTx", item)
                    tasks.append(task)

            extracted_data = await asyncio.gather(*tasks)
        
        # Sort the extracted data by EventItemAgendaSequence
        extracted_data.sort(key=lambda x: float('inf') if x.get("EventItemAgendaSequence") is None else x.get("EventItemAgendaSequence"))

        # Specify the output file path
        output_file = "extracted_data.json"

        # Write the extracted data to a file
        with open(output_file, "w") as json_file:
            json.dump(extracted_data, json_file, indent=4)

        print(f"Extracted data saved to {output_file}")
    else:
        print("No event items to process.")

if __name__ == "__main__":
    asyncio.run(main())
