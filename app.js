// ======================================================
// Supabase Configuration
// ======================================================

const SUPABASE_URL =
    "https://lmjxoucwaamkbhqxuhpo.supabase.co";


const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_0Y_w4IHTGKV24vdwhfNeyA_JMT698KR";


const db =
    supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );


// ======================================================
// Authentication Elements
// ======================================================

const loggedOutView =
    document.getElementById(
        "loggedOutView"
    );

const loggedInView =
    document.getElementById(
        "loggedInView"
    );

const emailInput =
    document.getElementById(
        "emailInput"
    );

const passwordInput =
    document.getElementById(
        "passwordInput"
    );

const signUpButton =
    document.getElementById(
        "signUpButton"
    );

const loginButton =
    document.getElementById(
        "loginButton"
    );

const logoutButton =
    document.getElementById(
        "logoutButton"
    );

const authMessage =
    document.getElementById(
        "authMessage"
    );

const loggedInEmail =
    document.getElementById(
        "loggedInEmail"
    );


// ======================================================
// Scan Elements
// ======================================================

const selectFolderButton =
    document.getElementById(
        "selectFolderButton"
    );

const stopScanButton =
    document.getElementById(
        "stopScanButton"
    );

const scanStatus =
    document.getElementById(
        "scanStatus"
    );

const scanTitle =
    document.getElementById(
        "scanTitle"
    );

const spinner =
    document.getElementById(
        "spinner"
    );

const scannedFoldersElement =
    document.getElementById(
        "scannedFolders"
    );

const scannedFilesElement =
    document.getElementById(
        "scannedFiles"
    );

const scannedSizeElement =
    document.getElementById(
        "scannedSize"
    );

const skippedItemsElement =
    document.getElementById(
        "skippedItems"
    );

const currentFolderElement =
    document.getElementById(
        "currentFolder"
    );


// ======================================================
// Summary Elements
// ======================================================

const summarySection =
    document.getElementById(
        "summarySection"
    );

const scanResultMessage =
    document.getElementById(
        "scanResultMessage"
    );

const folderNameElement =
    document.getElementById(
        "folderName"
    );

const fileCountElement =
    document.getElementById(
        "fileCount"
    );

const totalSizeElement =
    document.getElementById(
        "totalSize"
    );

const largestFileElement =
    document.getElementById(
        "largestFile"
    );


// ======================================================
// Cleanup Elements
// ======================================================

const cleanupSection =
    document.getElementById(
        "cleanupSection"
    );

const cleanupSelectedCount =
    document.getElementById(
        "cleanupSelectedCount"
    );

const cleanupSelectedSize =
    document.getElementById(
        "cleanupSelectedSize"
    );

const selectUserFilesButton =
    document.getElementById(
        "selectUserFilesButton"
    );

const clearCleanupButton =
    document.getElementById(
        "clearCleanupButton"
    );


// ======================================================
// Save Plan
// ======================================================

const savePlanSection =
    document.getElementById(
        "savePlanSection"
    );

const notesInput =
    document.getElementById(
        "notesInput"
    );

const savePlanButton =
    document.getElementById(
        "savePlanButton"
    );

const savePlanMessage =
    document.getElementById(
        "savePlanMessage"
    );


// ======================================================
// Type / File Elements
// ======================================================

const typeSection =
    document.getElementById(
        "typeSection"
    );

const typeSummary =
    document.getElementById(
        "typeSummary"
    );

const fileSection =
    document.getElementById(
        "fileSection"
    );

const fileTableBody =
    document.getElementById(
        "fileTableBody"
    );

const fileLimitMessage =
    document.getElementById(
        "fileLimitMessage"
    );

const fileTypeFilter =
    document.getElementById(
        "fileTypeFilter"
    );

const safetyFilter =
    document.getElementById(
        "safetyFilter"
    );

const minimumSizeFilter =
    document.getElementById(
        "minimumSizeFilter"
    );

const showSmallerFiles =
    document.getElementById(
        "showSmallerFiles"
    );

const selectAllVisibleCheckbox =
    document.getElementById(
        "selectAllVisibleCheckbox"
    );


// ======================================================
// History
// ======================================================

const historySection =
    document.getElementById(
        "historySection"
    );

const historyList =
    document.getElementById(
        "historyList"
    );

const refreshHistoryButton =
    document.getElementById(
        "refreshHistoryButton"
    );


// ======================================================
// Settings
// ======================================================

const MAX_FILES_TO_KEEP =
    2000;

const FILE_BUFFER_LIMIT =
    4000;

const UPDATE_INTERVAL =
    25;


// ======================================================
// Application State
// ======================================================

let currentUser =
    null;

let currentFolderName =
    "";

let stopRequested =
    false;

let scanRunning =
    false;

let scannedFiles =
    0;

let scannedFolders =
    0;

let skippedItems =
    0;

let totalBytes =
    0;

let largestFiles =
    [];

let typeStatistics =
    {};

let cleanupSelections =
    new Map();


// ======================================================
// Sign Up
// ======================================================

signUpButton.addEventListener(
    "click",
    async () => {

        clearAuthMessage();


        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value;


        if (
            !email
            ||
            !password
        ) {

            showAuthMessage(
                "Enter an email and password.",
                false
            );

            return;
        }


        if (
            password.length < 6
        ) {

            showAuthMessage(
                "Password must contain at least 6 characters.",
                false
            );

            return;
        }


        signUpButton.disabled =
            true;


        const {
            data,
            error
        } =
            await db.auth.signUp({

                email:
                    email,

                password:
                    password

            });


        signUpButton.disabled =
            false;


        if (error) {

            showAuthMessage(
                error.message,
                false
            );

            return;
        }


        if (
            data.session
        ) {

            showAuthMessage(
                "Account created successfully.",
                true
            );

        }

        else {

            showAuthMessage(
                "Account created. Check your email if confirmation is required.",
                true
            );

        }

    }
);


// ======================================================
// Login
// ======================================================

loginButton.addEventListener(
    "click",
    async () => {

        clearAuthMessage();


        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value;


        if (
            !email
            ||
            !password
        ) {

            showAuthMessage(
                "Enter an email and password.",
                false
            );

            return;
        }


        loginButton.disabled =
            true;


        const {
            error
        } =
            await db.auth.signInWithPassword({

                email:
                    email,

                password:
                    password

            });


        loginButton.disabled =
            false;


        if (error) {

            showAuthMessage(
                error.message,
                false
            );

        }

    }
);


// ======================================================
// Logout
// ======================================================

logoutButton.addEventListener(
    "click",
    async () => {

        await db.auth.signOut();

    }
);


// ======================================================
// Authentication UI
// ======================================================

function showAuthMessage(
    message,
    success
) {

    authMessage.textContent =
        message;


    authMessage.classList.remove(
        "success",
        "error"
    );


    authMessage.classList.add(
        success
            ?
            "success"
            :
            "error"
    );

}


function clearAuthMessage() {

    authMessage.textContent =
        "";


    authMessage.classList.remove(
        "success",
        "error"
    );

}


async function updateAuthenticationUI(
    session
) {

    if (
        session
        &&
        session.user
    ) {

        currentUser =
            session.user;


        loggedOutView.classList.add(
            "hidden"
        );


        loggedInView.classList.remove(
            "hidden"
        );


        loggedInEmail.textContent =
            currentUser.email;


        historySection.classList.remove(
            "hidden"
        );


        if (
            currentFolderName
        ) {

            savePlanSection.classList.remove(
                "hidden"
            );

        }


        await loadHistory();

    }

    else {

        currentUser =
            null;


        loggedOutView.classList.remove(
            "hidden"
        );


        loggedInView.classList.add(
            "hidden"
        );


        historySection.classList.add(
            "hidden"
        );


        savePlanSection.classList.add(
            "hidden"
        );


        historyList.innerHTML =
            "";

    }

}


// ======================================================
// Initial Session
// ======================================================

async function initializeAuthentication() {

    const {
        data
    } =
        await db.auth.getSession();


    await updateAuthenticationUI(
        data.session
    );

}


initializeAuthentication();


// ======================================================
// Auth State Changes
// ======================================================

db.auth.onAuthStateChange(
    (
        event,
        session
    ) => {

        setTimeout(
            () => {

                updateAuthenticationUI(
                    session
                );

            },
            0
        );

    }
);


// ======================================================
// Select Folder
// ======================================================

selectFolderButton.addEventListener(
    "click",
    async () => {

        if (
            scanRunning
        ) {

            alert(
                "A scan is already running."
            );

            return;
        }


        if (
            !(
                "showDirectoryPicker"
                in
                window
            )
        ) {

            alert(
                "Please use a recent version of Chrome or Edge through Live Server."
            );

            return;
        }


        try {

            const directoryHandle =
                await window.showDirectoryPicker({

                    mode:
                        "read"

                });


            await startScan(
                directoryHandle
            );

        }

        catch (error) {

            if (
                error.name
                ===
                "AbortError"
            ) {

                return;
            }


            console.error(
                error
            );


            alert(
                "The folder could not be opened."
            );

        }

    }
);


// ======================================================
// Stop Scan
// ======================================================

stopScanButton.addEventListener(
    "click",
    () => {

        stopRequested =
            true;


        stopScanButton.textContent =
            "Stopping...";


        scanTitle.textContent =
            "Stopping scan...";

    }
);


// ======================================================
// Start Scan
// ======================================================

async function startScan(
    directoryHandle
) {

    resetScan();


    currentFolderName =
        directoryHandle.name;


    scanRunning =
        true;


    stopRequested =
        false;


    selectFolderButton.disabled =
        true;


    stopScanButton.classList.remove(
        "hidden"
    );


    scanStatus.classList.remove(
        "hidden"
    );


    spinner.classList.remove(
        "hidden"
    );


    scanTitle.textContent =
        "Scanning...";


    summarySection.classList.add(
        "hidden"
    );


    cleanupSection.classList.add(
        "hidden"
    );


    savePlanSection.classList.add(
        "hidden"
    );


    typeSection.classList.add(
        "hidden"
    );


    fileSection.classList.add(
        "hidden"
    );


    updateProgress(
        currentFolderName
    );


    await allowBrowserToUpdate();


    await scanDirectory(
        directoryHandle,
        currentFolderName
    );


    scanRunning =
        false;


    selectFolderButton.disabled =
        false;


    stopScanButton.classList.add(
        "hidden"
    );


    spinner.classList.add(
        "hidden"
    );


    finishScan();

}


// ======================================================
// Reset Scan
// ======================================================

function resetScan() {

    scannedFiles =
        0;

    scannedFolders =
        0;

    skippedItems =
        0;

    totalBytes =
        0;


    largestFiles =
        [];


    cleanupSelections.clear();


    notesInput.value =
        "";


    savePlanMessage.textContent =
        "";


    typeStatistics = {

        Video: {
            count: 0,
            size: 0
        },

        Image: {
            count: 0,
            size: 0
        },

        Archive: {
            count: 0,
            size: 0
        },

        Program: {
            count: 0,
            size: 0
        },

        Document: {
            count: 0,
            size: 0
        },

        Audio: {
            count: 0,
            size: 0
        },

        Other: {
            count: 0,
            size: 0
        }

    };


    updateCleanupSummary();

}


// ======================================================
// Recursive Scan
// ======================================================

async function scanDirectory(
    directoryHandle,
    currentPath
) {

    if (
        stopRequested
    ) {

        return;
    }


    scannedFolders++;


    updateProgress(
        currentPath
    );


    try {

        for await (
            const [
                name,
                handle
            ]
            of directoryHandle.entries()
        ) {

            if (
                stopRequested
            ) {

                return;
            }


            if (
                handle.kind
                ===
                "file"
            ) {

                try {

                    const file =
                        await handle.getFile();


                    scannedFiles++;


                    totalBytes +=
                        file.size;


                    const category =
                        getFileCategory(
                            file.name
                        );


                    updateTypeStatistics(
                        category,
                        file.size
                    );


                    const fullPath =
                        currentPath
                        +
                        "/"
                        +
                        file.name;


                    const safety =
                        getSafetyInformation(
                            file.name,
                            currentPath
                        );


                    keepLargeFile({

                        name:
                            file.name,

                        path:
                            currentPath,

                        fullPath:
                            fullPath,

                        size:
                            file.size,

                        type:
                            category,

                        modified:
                            new Date(
                                file.lastModified
                            ),

                        safety:
                            safety.level,

                        safetyReason:
                            safety.reason

                    });

                }

                catch (error) {

                    skippedItems++;

                }

            }

            else if (
                handle.kind
                ===
                "directory"
            ) {

                await scanDirectory(

                    handle,

                    currentPath
                    +
                    "/"
                    +
                    name

                );

            }


            if (
                scannedFiles > 0
                &&
                scannedFiles
                    %
                    UPDATE_INTERVAL
                ===
                0
            ) {

                updateProgress(
                    currentPath
                );


                await allowBrowserToUpdate();

            }

        }

    }

    catch (error) {

        skippedItems++;

    }

}


// ======================================================
// Retain Largest Files
// ======================================================

function keepLargeFile(
    file
) {

    largestFiles.push(
        file
    );


    if (
        largestFiles.length
        >=
        FILE_BUFFER_LIMIT
    ) {

        largestFiles.sort(
            (
                a,
                b
            ) =>
                b.size
                -
                a.size
        );


        largestFiles =
            largestFiles.slice(
                0,
                MAX_FILES_TO_KEEP
            );

    }

}


// ======================================================
// Progress
// ======================================================

function updateProgress(
    path
) {

    scannedFoldersElement.textContent =
        scannedFolders
            .toLocaleString();


    scannedFilesElement.textContent =
        scannedFiles
            .toLocaleString();


    scannedSizeElement.textContent =
        formatBytes(
            totalBytes
        );


    skippedItemsElement.textContent =
        skippedItems
            .toLocaleString();


    currentFolderElement.textContent =
        path;

}


// ======================================================
// Finish Scan
// ======================================================

function finishScan() {

    largestFiles.sort(
        (
            a,
            b
        ) =>
            b.size
            -
            a.size
    );


    largestFiles =
        largestFiles.slice(
            0,
            MAX_FILES_TO_KEEP
        );


    scanTitle.textContent =
        stopRequested
            ?
            "Scan stopped"
            :
            "Scan completed";


    scanResultMessage.textContent =
        stopRequested
            ?
            "Scan stopped before completion."
            :
            "Scan completed successfully.";


    folderNameElement.textContent =
        currentFolderName;


    fileCountElement.textContent =
        scannedFiles
            .toLocaleString();


    totalSizeElement.textContent =
        formatBytes(
            totalBytes
        );


    largestFileElement.textContent =
        largestFiles.length > 0

            ?
            largestFiles[0].name
            +
            " ("
            +
            formatBytes(
                largestFiles[0].size
            )
            +
            ")"

            :
            "No readable files";


    summarySection.classList.remove(
        "hidden"
    );


    cleanupSection.classList.remove(
        "hidden"
    );


    typeSection.classList.remove(
        "hidden"
    );


    fileSection.classList.remove(
        "hidden"
    );


    if (
        currentUser
    ) {

        savePlanSection.classList.remove(
            "hidden"
        );

    }


    displayTypeSummary();


    refreshFileDisplay();


    stopRequested =
        false;

}


// ======================================================
// Filters
// ======================================================

fileTypeFilter.addEventListener(
    "change",
    refreshFileDisplay
);


safetyFilter.addEventListener(
    "change",
    refreshFileDisplay
);


minimumSizeFilter.addEventListener(
    "change",
    refreshFileDisplay
);


showSmallerFiles.addEventListener(
    "change",
    refreshFileDisplay
);


// ======================================================
// Visible Files
// ======================================================

function getVisibleFiles() {

    let minimumBytes =
        Number(
            minimumSizeFilter.value
        );


    if (
        showSmallerFiles.checked
    ) {

        minimumBytes =
            0;

    }


    return largestFiles.filter(
        file => {

            const sizeMatches =
                file.size
                >=
                minimumBytes;


            const typeMatches =
                fileTypeFilter.value
                ===
                "All"
                ||
                file.type
                ===
                fileTypeFilter.value;


            const safetyMatches =
                safetyFilter.value
                ===
                "All"
                ||
                file.safety
                ===
                safetyFilter.value;


            return (
                sizeMatches
                &&
                typeMatches
                &&
                safetyMatches
            );

        }
    );

}


// ======================================================
// Cleanup Selection
// ======================================================

selectUserFilesButton.addEventListener(
    "click",
    () => {

        getVisibleFiles()
            .forEach(
                file => {

                    if (
                        file.safety
                        ===
                        "User File"
                    ) {

                        cleanupSelections.set(
                            file.fullPath,
                            file
                        );

                    }

                }
            );


        updateCleanupSummary();


        refreshFileDisplay();

    }
);


clearCleanupButton.addEventListener(
    "click",
    () => {

        cleanupSelections.clear();


        updateCleanupSummary();


        refreshFileDisplay();

    }
);


selectAllVisibleCheckbox.addEventListener(
    "change",
    () => {

        const files =
            getVisibleFiles();


        if (
            selectAllVisibleCheckbox.checked
        ) {

            const risky =
                files.some(
                    file =>
                        file.safety
                        !==
                        "User File"
                );


            if (
                risky
            ) {

                const ok =
                    confirm(
                        "Some visible files are marked Caution or System Risk.\n\nDo you still want to select all visible files?"
                    );


                if (
                    !ok
                ) {

                    selectAllVisibleCheckbox.checked =
                        false;

                    return;

                }

            }


            files.forEach(
                file => {

                    cleanupSelections.set(
                        file.fullPath,
                        file
                    );

                }
            );

        }

        else {

            files.forEach(
                file => {

                    cleanupSelections.delete(
                        file.fullPath
                    );

                }
            );

        }


        updateCleanupSummary();


        refreshFileDisplay();

    }
);


// ======================================================
// Update Cleanup Summary
// ======================================================

function updateCleanupSummary() {

    const files =
        Array.from(
            cleanupSelections.values()
        );


    const size =
        files.reduce(
            (
                total,
                file
            ) =>
                total
                +
                file.size,
            0
        );


    cleanupSelectedCount.textContent =
        files.length
            .toLocaleString();


    cleanupSelectedSize.textContent =
        formatBytes(
            size
        );

}


// ======================================================
// Save Cleanup Plan
// ======================================================

savePlanButton.addEventListener(
    "click",
    async () => {

        if (
            !currentUser
        ) {

            showSaveMessage(
                "Log in before saving a cleanup plan.",
                false
            );

            return;
        }


        if (
            !currentFolderName
        ) {

            showSaveMessage(
                "Scan a folder first.",
                false
            );

            return;
        }


        const selectedFiles =
            Array.from(
                cleanupSelections.values()
            );


        const selectedSize =
            selectedFiles.reduce(
                (
                    total,
                    file
                ) =>
                    total
                    +
                    file.size,
                0
            );


        savePlanButton.disabled =
            true;


        const {
            error
        } =
            await db
                .from(
                    "cleanup_sessions"
                )
                .insert({

                    user_id:
                        currentUser.id,

                    folder_name:
                        currentFolderName,

                    files_scanned:
                        scannedFiles,

                    total_size_bytes:
                        totalBytes,

                    selected_files_count:
                        selectedFiles.length,

                    selected_size_bytes:
                        selectedSize,

                    notes:
                        notesInput.value.trim()

                });


        savePlanButton.disabled =
            false;


        if (
            error
        ) {

            console.error(
                error
            );


            showSaveMessage(
                "Could not save cleanup plan: "
                +
                error.message,
                false
            );

            return;

        }


        showSaveMessage(
            "Cleanup plan saved successfully.",
            true
        );


        await loadHistory();

    }
);


function showSaveMessage(
    message,
    success
) {

    savePlanMessage.textContent =
        message;


    savePlanMessage.classList.remove(
        "success",
        "error"
    );


    savePlanMessage.classList.add(
        success
            ?
            "success"
            :
            "error"
    );

}


// ======================================================
// Load History
// ======================================================

refreshHistoryButton.addEventListener(
    "click",
    loadHistory
);


async function loadHistory() {

    if (
        !currentUser
    ) {

        return;

    }


    historyList.innerHTML =
        "<p class='small-message'>Loading...</p>";


    const {
        data,
        error
    } =
        await db
            .from(
                "cleanup_sessions"
            )
            .select(
                "*"
            )
            .order(
                "created_at",
                {
                    ascending:
                        false
                }
            );


    if (
        error
    ) {

        historyList.innerHTML =
            "<p class='small-message'>Could not load history.</p>";


        console.error(
            error
        );


        return;

    }


    renderHistory(
        data
        ||
        []
    );

}


// ======================================================
// Render History
// ======================================================

function renderHistory(
    sessions
) {

    historyList.innerHTML =
        "";


    if (
        sessions.length
        ===
        0
    ) {

        historyList.innerHTML =
            "<p class='small-message'>No cleanup plans yet.</p>";


        return;

    }


    sessions.forEach(
        session => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "history-item";


            const header =
                document.createElement(
                    "div"
                );


            header.className =
                "history-header";


            const titleArea =
                document.createElement(
                    "div"
                );


            const title =
                document.createElement(
                    "h3"
                );


            title.className =
                "history-title";


            title.textContent =
                session.folder_name;


            const date =
                document.createElement(
                    "div"
                );


            date.className =
                "history-date";


            date.textContent =
                new Date(
                    session.created_at
                )
                .toLocaleString();


            titleArea.appendChild(
                title
            );


            titleArea.appendChild(
                date
            );


            header.appendChild(
                titleArea
            );


            const grid =
                document.createElement(
                    "div"
                );


            grid.className =
                "history-grid";


            grid.appendChild(
                createHistoryStat(
                    "Files Scanned",
                    Number(
                        session.files_scanned
                    )
                    .toLocaleString()
                )
            );


            grid.appendChild(
                createHistoryStat(
                    "Total Analyzed",
                    formatBytes(
                        Number(
                            session.total_size_bytes
                        )
                    )
                )
            );


            grid.appendChild(
                createHistoryStat(
                    "Selected for Cleanup",
                    formatBytes(
                        Number(
                            session.selected_size_bytes
                        )
                    )
                    +
                    " ("
                    +
                    Number(
                        session.selected_files_count
                    )
                    .toLocaleString()
                    +
                    " files)"
                )
            );


            const notes =
                document.createElement(
                    "div"
                );


            notes.className =
                "history-notes";


            notes.textContent =
                session.notes
                ?
                session.notes
                :
                "No notes";


            const actions =
                document.createElement(
                    "div"
                );


            actions.className =
                "history-actions";


            const editButton =
                document.createElement(
                    "button"
                );


            editButton.className =
                "edit-button";


            editButton.textContent =
                "Edit Notes";


            editButton.addEventListener(
                "click",
                () => {

                    editHistoryNotes(
                        session
                    );

                }
            );


            const deleteButton =
                document.createElement(
                    "button"
                );


            deleteButton.className =
                "delete-button";


            deleteButton.textContent =
                "Delete";


            deleteButton.addEventListener(
                "click",
                () => {

                    deleteHistorySession(
                        session
                    );

                }
            );


            actions.appendChild(
                editButton
            );


            actions.appendChild(
                deleteButton
            );


            item.appendChild(
                header
            );


            item.appendChild(
                grid
            );


            item.appendChild(
                notes
            );


            item.appendChild(
                actions
            );


            historyList.appendChild(
                item
            );

        }
    );

}


// ======================================================
// History Stat
// ======================================================

function createHistoryStat(
    label,
    value
) {

    const container =
        document.createElement(
            "div"
        );


    container.className =
        "history-stat";


    const labelElement =
        document.createElement(
            "span"
        );


    labelElement.className =
        "history-stat-label";


    labelElement.textContent =
        label;


    const valueElement =
        document.createElement(
            "span"
        );


    valueElement.className =
        "history-stat-value";


    valueElement.textContent =
        value;


    container.appendChild(
        labelElement
    );


    container.appendChild(
        valueElement
    );


    return container;

}


// ======================================================
// UPDATE
// ======================================================

async function editHistoryNotes(
    session
) {

    const newNotes =
        prompt(
            "Edit notes:",
            session.notes
            ||
            ""
        );


    if (
        newNotes
        ===
        null
    ) {

        return;

    }


    const {
        error
    } =
        await db
            .from(
                "cleanup_sessions"
            )
            .update({

                notes:
                    newNotes.trim()

            })
            .eq(
                "id",
                session.id
            );


    if (
        error
    ) {

        alert(
            "Could not update notes: "
            +
            error.message
        );


        return;

    }


    await loadHistory();

}


// ======================================================
// DELETE
// ======================================================

async function deleteHistorySession(
    session
) {

    const confirmed =
        confirm(
            "Delete this cleanup history record?\n\nFolder: "
            +
            session.folder_name
        );


    if (
        !confirmed
    ) {

        return;

    }


    const {
        error
    } =
        await db
            .from(
                "cleanup_sessions"
            )
            .delete()
            .eq(
                "id",
                session.id
            );


    if (
        error
    ) {

        alert(
            "Could not delete record: "
            +
            error.message
        );


        return;

    }


    await loadHistory();

}


// ======================================================
// Display Files
// ======================================================

function refreshFileDisplay() {

    displayFiles(
        getVisibleFiles()
    );

}


function displayFiles(
    files
) {

    fileTableBody.innerHTML =
        "";


    files.forEach(
        file => {

            const row =
                document.createElement(
                    "tr"
                );


            if (
                file.safety
                ===
                "System Risk"
            ) {

                row.classList.add(
                    "risk-row"
                );

            }


            const checkboxCell =
                document.createElement(
                    "td"
                );


            checkboxCell.className =
                "checkbox-column";


            const checkbox =
                document.createElement(
                    "input"
                );


            checkbox.type =
                "checkbox";


            checkbox.className =
                "cleanup-checkbox";


            checkbox.checked =
                cleanupSelections.has(
                    file.fullPath
                );


            checkbox.addEventListener(
                "change",
                () => {

                    if (
                        checkbox.checked
                        &&
                        file.safety
                        ===
                        "System Risk"
                    ) {

                        const ok =
                            confirm(
                                "This file is marked System Risk.\n\nIt may belong to Windows or installed software.\n\nInclude it in the cleanup estimate anyway?"
                            );


                        if (
                            !ok
                        ) {

                            checkbox.checked =
                                false;


                            return;

                        }

                    }


                    if (
                        checkbox.checked
                    ) {

                        cleanupSelections.set(
                            file.fullPath,
                            file
                        );

                    }

                    else {

                        cleanupSelections.delete(
                            file.fullPath
                        );

                    }


                    updateCleanupSummary();


                    refreshFileDisplay();

                }
            );


            checkboxCell.appendChild(
                checkbox
            );


            const nameCell =
                document.createElement(
                    "td"
                );


            nameCell.textContent =
                file.name;


            nameCell.className =
                "file-name";


            const typeCell =
                document.createElement(
                    "td"
                );


            typeCell.textContent =
                file.type;


            const sizeCell =
                document.createElement(
                    "td"
                );


            sizeCell.textContent =
                formatBytes(
                    file.size
                );


            if (
                file.size
                >=
                100
                *
                1024
                *
                1024
            ) {

                sizeCell.classList.add(
                    "large-file"
                );

            }


            const safetyCell =
                document.createElement(
                    "td"
                );


            const badge =
                document.createElement(
                    "span"
                );


            badge.className =
                "badge";


            badge.textContent =
                file.safety;


            if (
                file.safety
                ===
                "User File"
            ) {

                badge.classList.add(
                    "user-file-badge"
                );

            }

            else if (
                file.safety
                ===
                "Caution"
            ) {

                badge.classList.add(
                    "caution-badge"
                );

            }

            else {

                badge.classList.add(
                    "system-risk-badge"
                );

            }


            const reason =
                document.createElement(
                    "span"
                );


            reason.className =
                "risk-reason";


            reason.textContent =
                file.safetyReason;


            safetyCell.appendChild(
                badge
            );


            safetyCell.appendChild(
                reason
            );


            const modifiedCell =
                document.createElement(
                    "td"
                );


            modifiedCell.textContent =
                file.modified
                    .toLocaleDateString();


            const pathCell =
                document.createElement(
                    "td"
                );


            pathCell.textContent =
                file.path;


            pathCell.className =
                "file-path";


            row.appendChild(
                checkboxCell
            );


            row.appendChild(
                nameCell
            );


            row.appendChild(
                typeCell
            );


            row.appendChild(
                sizeCell
            );


            row.appendChild(
                safetyCell
            );


            row.appendChild(
                modifiedCell
            );


            row.appendChild(
                pathCell
            );


            fileTableBody.appendChild(
                row
            );

        }
    );


    fileLimitMessage.textContent =
        "Showing "
        +
        files.length.toLocaleString()
        +
        " matching files from the "
        +
        MAX_FILES_TO_KEEP.toLocaleString()
        +
        " largest retained files.";

}


// ======================================================
// File Type Summary
// ======================================================

function updateTypeStatistics(
    category,
    size
) {

    typeStatistics[
        category
    ].count++;


    typeStatistics[
        category
    ].size +=
        size;

}


function displayTypeSummary() {

    typeSummary.innerHTML =
        "";


    const entries =
        Object.entries(
            typeStatistics
        );


    entries.sort(
        (
            a,
            b
        ) =>
            b[1].size
            -
            a[1].size
    );


    entries.forEach(
        (
            [
                category,
                data
            ]
        ) => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "type-card";


            card.innerHTML =
                "<div class='type-name'>"
                +
                category
                +
                "</div>"
                +
                "<div class='type-size'>"
                +
                formatBytes(
                    data.size
                )
                +
                "</div>"
                +
                "<div class='type-count'>"
                +
                data.count.toLocaleString()
                +
                " files</div>";


            typeSummary.appendChild(
                card
            );

        }
    );

}


// ======================================================
// Safety
// ======================================================

function getSafetyInformation(
    fileName,
    path
) {

    const lowerName =
        fileName.toLowerCase();


    const lowerPath =
        path.toLowerCase();


    const segments =
        lowerPath.split("/");


    const extension =
        lowerName.includes(".")
            ?
            lowerName.split(".").pop()
            :
            "";


    const systemFolders = [

        "windows",
        "program files",
        "program files (x86)",
        "programdata",
        "system volume information",
        "recovery",
        "boot"

    ];


    if (
        segments.some(
            segment =>
                systemFolders.includes(
                    segment
                )
        )
    ) {

        return {

            level:
                "System Risk",

            reason:
                "Located in a Windows or installed-program folder."

        };

    }


    const systemExtensions = [

        "sys",
        "dll",
        "drv",
        "efi",
        "cat",
        "inf",
        "mui",
        "ocx",
        "cpl"

    ];


    if (
        systemExtensions.includes(
            extension
        )
    ) {

        return {

            level:
                "System Risk",

            reason:
                "File type commonly used by Windows, drivers, or software."

        };

    }


    const cautionExtensions = [

        "exe",
        "msi",
        "bat",
        "cmd",
        "ps1",
        "com",
        "scr",
        "jar"

    ];


    if (
        cautionExtensions.includes(
            extension
        )
    ) {

        return {

            level:
                "Caution",

            reason:
                "Executable, installer, or script file."

        };

    }


    if (
        segments.includes(
            "appdata"
        )
        ||
        segments.includes(
            "temp"
        )
    ) {

        return {

            level:
                "Caution",

            reason:
                "Located in application or temporary storage."

        };

    }


    return {

        level:
            "User File",

        reason:
            "No common system risk indicator detected."

    };

}


// ======================================================
// File Category
// ======================================================

function getFileCategory(
    fileName
) {

    const extension =
        fileName.includes(".")
            ?
            fileName
                .split(".")
                .pop()
                .toLowerCase()
            :
            "";


    const groups = {

        Video: [
            "mp4",
            "mkv",
            "avi",
            "mov",
            "wmv",
            "webm"
        ],

        Image: [
            "jpg",
            "jpeg",
            "png",
            "gif",
            "webp",
            "bmp"
        ],

        Archive: [
            "zip",
            "rar",
            "7z",
            "tar",
            "gz",
            "iso"
        ],

        Program: [
            "exe",
            "msi",
            "bat",
            "cmd",
            "ps1",
            "jar"
        ],

        Document: [
            "pdf",
            "doc",
            "docx",
            "txt",
            "ppt",
            "pptx",
            "xls",
            "xlsx",
            "csv"
        ],

        Audio: [
            "mp3",
            "wav",
            "flac",
            "aac",
            "m4a"
        ]

    };


    for (
        const category
        in groups
    ) {

        if (
            groups[
                category
            ].includes(
                extension
            )
        ) {

            return category;

        }

    }


    return "Other";

}


// ======================================================
// Utilities
// ======================================================

function allowBrowserToUpdate() {

    return new Promise(
        resolve => {

            setTimeout(
                resolve,
                0
            );

        }
    );

}


function formatBytes(
    bytes
) {

    if (
        bytes === 0
    ) {

        return "0 B";

    }


    const units = [

        "B",
        "KB",
        "MB",
        "GB",
        "TB"

    ];


    const base =
        1024;


    let index =
        Math.floor(
            Math.log(bytes)
            /
            Math.log(base)
        );


    index =
        Math.min(
            index,
            units.length - 1
        );


    const value =
        bytes
        /
        Math.pow(
            base,
            index
        );


    return (
        value.toFixed(2)
        +
        " "
        +
        units[
            index
        ]
    );

}